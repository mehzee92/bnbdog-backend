const pool = require('../config/db');

module.exports = {
  async getPools({ query, page = 0, chain = 0 }) {
    const perPage = 3;
    const startAt = page * perPage;
    let conditions = " AND chain=?";
    let params = [chain];

    if (query && query.length > 0) {
      conditions += " AND name LIKE ?";
      params.splice(0, 0, `%${query}%`);
    }

    const sql = `SELECT * FROM pools WHERE 1=1 ${conditions} ORDER BY uid DESC LIMIT ?, ?`;
    params.push(startAt, perPage);

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async getPoolByUid(uid) {
    const [rows] = await pool.query("SELECT * FROM pools WHERE uid=?", [uid]);
    return rows[0];
  },

  async createPool(data) {
    const fields = `
      uid, name, chain, staking_token_name, staking_token_address, staking_token_logo,
      reward_token_name, reward_token_address, reward_token_logo, detail, created_by,
      create_on, period, reward_percentage, sacrifice, maxAmount, website, telegram,
      facebook, twitter, instagram
    `;
    const values = [
      data.uid, data.name, data.chain, data.sName, data.sAddress, data.sLogo,
      data.rName, data.rAddress, data.rLogo, data.detail, data.createdBy,
      new Date(), data.period, data.rewardPercentage, data.sacrifice, data.maxAmount,
      data.website, data.telegram, data.facebook, data.twitter, data.instagram
    ];

    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO pools (${fields}) VALUES (${placeholders})`;

    const [result] = await pool.query(sql, values);
    return result.insertId;
  }
};
