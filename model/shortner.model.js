import db from '../config/dbClient.js';

export const loadLinks = async() => {
  const [rows] = await db.execute('SELECT * FROM `url-shortener`');
  return rows;
}

export const saveLink = async(link) => {
  console.log("save link------------", link)
  const [results] = await db.execute('INSERT INTO `url-shortener` (short_code, URL) VALUES (?, ?)', 
    [
        link.short_code, 
        link.URL
    ]);
  return results;
}   

export const getLinkByCode = async(code)  => {
    const [result] = await db.execute('SELECT * FROM `url-shortener` WHERE short_code = ?', [code]);
    if(result.length === 0) return null;
    else return result[0];
}

export const deleteLinkByCode = async(id) => {
    const [result] = await db.execute('DELETE FROM `url-shortener` WHERE id = ?', [id]);
    return result;
} 


export const findShortLinkById= async(id)  => {
    const [result] = await db.execute('SELECT * FROM `url-shortener` WHERE id = ?', [id]);
    if(result.length === 0) return null;
    else return result[0];
}

export const updateShortCode = async({id, URL, short_code}) => {
    const [result] = await db.execute('UPDATE `url-shortener` SET short_code = ?, URL = ? WHERE id = ?', [short_code, URL, id]);
    return result;
}