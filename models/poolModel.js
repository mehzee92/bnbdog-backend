const pool = require('../config/db');

module.exports = {


  async getPools(query) {
      const page = query.page || 0; 
      const perPage = 6;
      const startAt = page * perPage;
      let conditions = " ";
      let params = [];
      
      if (query && query.q) 
      {
        conditions += " AND (name LIKE ? OR detail LIKE ?)";
        params.splice(0, 0, `%${query.q}%`);
        params.splice(0, 0, `%${query.q}%`);
      }

    const sql = `SELECT * FROM pools WHERE 1=1 ${conditions} ORDER BY uid DESC LIMIT ?, ?`;
    params.push(startAt, perPage);

    const [rows] = await pool.query(sql, params);
    return rows;
  },




    async getLatestPools(query) 
    {
      const page = query.page || 0; 
      const perPage = 6;
      const startAt = page * perPage;
      let conditions = " ";
      let params = [];

      if (query && query.q) 
      {
        conditions += " AND (name LIKE ? OR detail LIKE ?)";
        params.splice(0, 0, `%${query.q}%`);
        params.splice(0, 0, `%${query.q}%`);
      }

      const sql = `SELECT * FROM pools WHERE 1=1 ${conditions} ORDER BY id DESC LIMIT ?, ?`;
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
      uid, name,  staking_token_name, staking_token_address, staking_token_logo,
      reward_token_name, reward_token_address, reward_token_logo, detail, created_by,
      create_on, period, reward_percentage, sacrifice, maxAmount, website, telegram,
      facebook, twitter, instagram
    `;
    const values = [
      data.uid, data.name,  data.sName, data.sAddress, data.sLogo,
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
