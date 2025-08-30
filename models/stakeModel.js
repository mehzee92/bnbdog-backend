// models/stakeModel.js
const pool = require('../config/db'); // we’ll create config/db.js for DB connection

// Create new stake
async function createStake(uid, index_no, staker, amount, reward) {
    const fields = "uid, index_no, staker, amount, reward, created_on, status";
    const values = `'${uid}', '${index_no}', '${staker}', '${amount}', '${reward}', NOW(), 'a'`;
    const sql = `INSERT INTO stakes (${fields}) VALUES (${values})`;
    const [rows] = await pool.query(sql);
    return rows;
}

// Mark stake as unstaked
async function unstake(index_no, uid, address) {
    const sql = `
        UPDATE stakes 
        SET status='u', unstake_dtg=NOW() 
        WHERE staker='${address}' AND uid='${uid}' 
        AND index_no=${index_no}
    `;
    const [rows] = await pool.query(sql);
    return rows;
}

// Get active stakes for user
async function getMyStakes(address) {
    const sql = `
        SELECT stakes.uid as uid, index_no, amount, pools.name as name, 
               pools.staking_token_logo, pools.staking_token_address as saddress, pools.staking_token_name as sname, 
               pools.reward_token_logo, pools.reward_token_address as raddress, pools.period as period, pools.reward_token_name as rname,
               pools.reward_percentage as reward_percentage, reward
        FROM stakes
        LEFT JOIN pools ON stakes.uid = pools.uid 
        WHERE staker='${address}' AND stakes.status='a';
    `;
    const [rows] = await pool.query(sql);
    return rows;
}

// Get positions for a pool
async function getMyPositions(uid, staker) {
    const sql = `
        SELECT stakes.id as id, index_no, stakes.uid as uid, amount, created_on
        FROM stakes
        WHERE stakes.uid='${uid}' AND stakes.staker='${staker}' 
              AND stakes.status='a';
    `;
    console.log(sql)
    const [rows] = await pool.query(sql);
    return rows;
}

module.exports = {
    createStake,
    unstake,
    getMyStakes,
    getMyPositions
};
