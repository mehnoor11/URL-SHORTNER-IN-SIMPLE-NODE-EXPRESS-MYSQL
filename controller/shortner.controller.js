import { getLinkByCode, loadLinks, saveLink, deleteLinkByCode, findShortLinkById, updateShortCode } from "../model/shortner.model.js";
import crypto from "crypto";
export async function getShortnerPage(req, res) {
    try {
        const links = await loadLinks();
        return res.render("index", {
           user: req?.session?.user || null,  // 👈 user defined hoga ya null
           links: links,
           errors: [],
           host: req.get("host"),
           currentPage: 1,
          totalPages: 1
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }   
}    

export async function postShortnerPage(req, res) {
    try {
        const {shortcode, URL } = req.body;
        const finalShortCode = shortcode || crypto.randomBytes(4).toString('hex');
        const links = await loadLinks();  
    if(links[finalShortCode]) 
        return res.status(400).send(
    '<h1>Url withShortcode already exists. Please choose another. <a href="/">Go Back</a></h1>  '
        );   
         await saveLink({short_code: finalShortCode, URL});
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }   
}

export async function redirectToShortLink(req, res) {
    try {
        const {shortCode} = req.params;
        const link = await  getLinkByCode(shortCode);
        if(!link) return res.status(404).send('Link not found');
        return res.redirect(link.URL);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }   
}   
export async  function deleteShortLink(req, res) {
    try {
        const {id} = req.params;
        const result =  await deleteLinkByCode(id);
        if(!result) return res.status(404).send('Link not found');
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}
export const getShortenerEditPage = async (req, res) => {
   const { id } = req.params;
  try {
    const shortLink = await findShortLinkById(id);
    if (!shortLink) return res.status(404).send("Short link not found");

    res.render("edit-shortLink", {
      user: req?.session?.user || null,
      id: shortLink.id,
      url: shortLink.URL,
      short_code: shortLink.short_code,
      errors: [],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

// postShortenerEditPage
export const postShortenerEditPage = async (req, res) => {
  const { id } = req.params;
  try {
    const { URL, short_code } = req.body;
    const newUpdateShortCode = await updateShortCode({ id, URL, short_code});
    if (!newUpdateShortCode) return res.status(404).send("Short link not found");
    res.redirect("/");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      req.flash("errors", "Shortcode already exists, please choose another");
      return res.redirect(`/edit/${id}`);
    }

    console.error(err);
    return res.status(500).send("Internal server error");
  }
};