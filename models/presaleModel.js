const pool = require('../config/db');

module.exports = {



async getPresales({ query = '', page = 0 }) {
  const perPage = 10;
  const startAt = page * perPage;

  let conditions = '';
  let params = [];

  if (query.length > 0) {
    conditions = "WHERE token_name LIKE ?";
    params = [`%${query}%`];
  }

  const sql = `
    SELECT *
    FROM presale
    ${conditions}
    ORDER BY id DESC
    LIMIT ?, ?
  `;
  params.push(startAt, perPage);

  const [rows] = await pool.query(sql, params);
  return rows;
},
  

  async getRecentPresales() {
    const sql = `
      SELECT *
      FROM presale
      ORDER BY id DESC
      LIMIT 15
    `;
    const [rows] = await pool.query(sql);
    return rows;
  },

  async getPresaleByUid(uid) {
    const [rows] = await pool.query("SELECT * FROM presale WHERE uid = ?", [uid]);
    return rows[0];
  },



  async getPresalesByCreator(creator) {
    const sql = `
      SELECT *
      FROM presale
      WHERE creator = ?
      ORDER BY id DESC
    `;
    const [rows] = await pool.query(sql, [creator]);
    return rows;
  },


  
async createPresale(data) {
  try {
    const sql = `
      INSERT INTO presale (
        uid, token_name, token_address, token_symbol, token_logo,
        creator, tokens_for_sale, 
        presale_tokens_per_eth, listing_tokens_per_eth, soft_cap, total_supply,
        start_time, end_time,
        website, twitter, telegram,
        description, created_on
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), ?, ?, ?, ?, NOW())
    `;

    const params = [
      data.uid,
      data.token_name, data.token_address, data.token_symbol, data.token_logo,
      data.creator,  data.tokens_for_sale, 
      data.presale_tokens_per_eth, data.listing_tokens_per_eth, 
      data.soft_cap, data.total_supply, data.period,
      data.website, data.twitter, data.telegram,
      data.short_description
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;

  } catch (error) {
    console.error('Error creating presale:', error);
    throw new Error('Failed to create presale due to a database error.');
  }
},  


async updatePresale(id, data) {
  const sql = `
    UPDATE presale SET
      token_name = ?, token_address = ?, token_symbol = ?,
      creator = ?,  tokens_for_sale = ?, tokens_sold = ?,
      tokens_per_eth = ?, soft_cap = ?,  raised = ?, total_supply = ?,
      start_time = ?, end_time = ?, state = ?,
      website = ?, twitter = ?, telegram = ?, discord = ?, facebook = ?, instagram = ?, youtube = ?,
      description = ?
    WHERE id = ?
  `;

  const params = [
    data.token_name, data.token_address, data.token_symbol,
    data.creator, data.sale_token, data.tokens_for_sale, data.tokens_sold,
    data.tokens_per_eth, data.soft_cap, data.raised, data.total_supply,
    data.start_time, data.end_time, data.state,
    data.website, data.twitter, data.telegram, data.discord,
    data.facebook, data.instagram, data.youtube,
    data.description,
    id // <- condition for updating
  ];

  const [result] = await pool.query(sql, params);
  return result.affectedRows > 0; // returns true if updated
},


  async updatePresaleInfo(result) {
    for (const data of result) {
      try {
        const sql = `
          UPDATE presale SET
	    id = ?, 
            creator = ?, 
            token_address = ?,
            tokens_for_sale = ?,  
            presale_tokens_per_eth = ?, 
            blockNumber = ?, 
            hash = ?
          WHERE uid = ?;
        `;

        const params = [
          data.id, 
          data.creator, 
          data.token_address,
          data.tokens_for_sale,  
          data.presale_tokens_per_eth, 
          data.blockNumber, 
          data.hash,
          data.uid
        ];

        const [rows] = await pool.query(sql, params);

        // Optional logging
        if (rows.affectedRows === 0) {
          console.warn(`⚠️ No record found for uid ${data.uid}, nothing updated.`);
        } else {
          console.log(`✅ Updated presale with uid ${data.uid}`);
        }
      } catch (err) {
        console.error(`❌ Failed to update presale with uid ${data.uid}:`, err.message);
      }
    }
  },


async updatePresaleProgress(data) {
  const {status, raised, tokensSold, uid } = data;
  try {
    const sql = `
      UPDATE presale SET
        status = ?, 
        raised = ?, 
        tokens_sold = ?
      WHERE uid = ?;
    `;

    const params = [status, raised, tokensSold, uid];
    const [rows] = await pool.query(sql, params);

    if (rows.affectedRows === 0) {
      console.warn(`⚠️ No record found for uid ${uid}, nothing updated.`);
      return {status:"error", message:`⚠️ No record found for uid ${uid}, nothing updated.`}
    } else {
      return rows;
    }
  } catch (err) {
    console.error(`❌ Failed to update presale with uid ${uid}:`, err.message);
    return {status:"error", message:err.message}
  }
}



};
