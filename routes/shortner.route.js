import express from 'express';
const router = express.Router();
import { getShortnerPage, postShortnerPage, redirectToShortLink, deleteShortLink, getShortenerEditPage, postShortenerEditPage } from '../controller/shortner.controller.js';

router.get('/', getShortnerPage);
router.post('/', postShortnerPage);
router.get('/:shortCode', redirectToShortLink);
router.post('/delete/:id', deleteShortLink);
router.route("/edit/:id").get(getShortenerEditPage).post(postShortenerEditPage);

export default router;