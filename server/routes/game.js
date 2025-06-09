import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/result', auth, async (req, res) => {
    const { result } = req.body;
    const user = await User.findById(req.user.id);

    user.gamesPlayed += 1;

    if (result === 'win') {
        user.wins += 1;
        user.points += (user.wins === 1) ? 15 : 5;
    } else if (result === 'lose') {
        user.losses += 1;
        user.points = Math.max(0, user.points - 5);
    } else if (result === 'draw') {
        user.draws += 1;
    }

    await user.save();
    res.json({ points: user.points });
});

router.get('/score', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("username points wins losses draws gamesPlayed");
    res.json(user);
});

export default router;
