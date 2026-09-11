const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../services/databaseService');
const { JWT_SECRET } = require('../middleware/authMiddleware');

exports.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username/email and password are required.' });
    }

    // Find by username or email
    let user = db.findUserByUsername(username);
    if (!user) {
      user = db.findUserByEmail(username);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    // Check role if specified
    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Account found, but it is registered as '${user.role}', not '${role}'. Please switch role tabs.`
      });
    }

    // Compare bcrypt hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please check and try again.' });
    }

    // Issue JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash, ...safeUser } = user;
    return res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, name, role = 'student', region = 'Jharkhand', school } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Username, email and password are required.' });
    }

    if (db.findUserByUsername(username)) {
      return res.status(409).json({ success: false, message: 'Username is already taken.' });
    }
    if (db.findUserByEmail(email)) {
      return res.status(409).json({ success: false, message: 'Email is already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = db.createUser({
      username,
      email,
      passwordHash,
      name: name || username,
      role,
      region,
      school: school || 'Model Primary School',
      preferredLanguage: 'santhali'
    });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash: _, ...safeUser } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { googleToken, role = 'student' } = req.body;
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
      // In demo environment, allow Demo Google Login with warning
      const demoEmail = `demo.google.${role}@bhashasetu.edu.in`;
      let user = db.findUserByEmail(demoEmail);

      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('DemoGooglePass@123', salt);
        user = db.createUser({
          username: `google_${role}`,
          email: demoEmail,
          passwordHash,
          name: `Google Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
          role,
          region: 'Jharkhand',
          isGoogleAuth: true
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { passwordHash, ...safeUser } = user;
      return res.json({
        success: true,
        message: 'Demo Google Login authenticated successfully.',
        demoMode: true,
        warning: 'Google OAuth Client ID is not configured in .env. Running in Safe Demo Google Login mode.',
        token,
        user: safeUser
      });
    }

    // If client ID is present, we would verify the Google JWT here
    return res.status(501).json({
      success: false,
      message: 'Google OAuth token verification endpoint is configured. Ready for production Google Sign-In.'
    });
  } catch (err) {
    console.error('Google login error:', err);
    return res.status(500).json({ success: false, message: 'Google authentication error.' });
  }
};

exports.getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  const { passwordHash, ...safeUser } = req.user;
  res.json({ success: true, user: safeUser });
};