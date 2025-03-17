const fs = require('fs');
const axios = require('axios');

const TOKEN_FILE = 'token.txt';
const CLAIM_ENDPOINT = 'https://api.sogni.ai/v2/account/reward/claim';
const REWARD_ENDPOINT = 'https://api.sogni.ai/v2/account/rewards';
const DAILY_BOOST_ID = '2';
const CLAIM_INTERVAL_MS = 60000; 
const RESTART_INTERVAL_MS = 24 * 60 * 60 * 1000; 

function printBanner() {
  console.log('==================================================');
  console.log('  Auto Claim Daily Bot - kachalKhan - AliensWeb3  ');
  console.log('==================================================');
}

async function getTokens() {
  try {
    const data = await fs.promises.readFile(TOKEN_FILE, 'utf8');
    const tokens = data.split('\n').map(t => t.trim()).filter(t => t);
    return tokens;
  } catch (error) {
    console.error('Error reading token file:', error.message);
    process.exit(1);
  }
}

async function checkRewardStatus(token) {
  try {
    const response = await axios.get(REWARD_ENDPOINT, {
      headers: {
        'accept': '*/*',
        'authorization': token,
        'content-type': 'application/json',
        'Referer': 'https://app.sogni.ai/',
      }
    });

    if (response.data.status === 'success') {
      const rewards = response.data.data.rewards;
      const dailyBoost = rewards.find(reward => reward.id === DAILY_BOOST_ID);
      
      return dailyBoost && dailyBoost.canClaim === 1;
    }
    return false;
  } catch (error) {
    console.error('Error checking reward status:', error.message);
    return false;
  }
}

async function claimDailyBoost(token, index) {
  try {
    const response = await axios.post(CLAIM_ENDPOINT, 
      { claims: [DAILY_BOOST_ID] },
      {
        headers: {
          'accept': '*/*',
          'authorization': token,
          'content-type': 'application/json',
          'Referer': 'https://app.sogni.ai/',
        }
      }
    );

    if (response.data.status === 'success') {
      console.log(`[${new Date().toISOString()}][Account ${index+1}] Daily boost claimed successfully!`);
      return true;
    } else {
      console.error(`[${new Date().toISOString()}][Account ${index+1}] Failed to claim:`, response.data);
      return false;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}][Account ${index+1}] Error claiming daily boost:`, error.message);
    return false;
  }
}

async function processAllTokens(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    console.log(`[${new Date().toISOString()}][Account ${i+1}] Checking reward status...`);

    const isClaimable = await checkRewardStatus(tokens[i]);

    if (isClaimable) {
      await claimDailyBoost(tokens[i], i);
    } else {
      console.log(`[${new Date().toISOString()}][Account ${i+1}] Daily boost not available.`);
    }

    if (i < tokens.length - 1) {
      console.log(`[${new Date().toISOString()}] Waiting 1 minute before next account...`);
      await new Promise(resolve => setTimeout(resolve, CLAIM_INTERVAL_MS));
    }
  }
}

async function startBot() {
  printBanner();

  const tokens = await getTokens();
  console.log(`[${new Date().toISOString()}] Loaded ${tokens.length} accounts.`);

  await processAllTokens(tokens);

  console.log(`[${new Date().toISOString()}] All accounts processed. Next run in 24 hours.`);

  setTimeout(startBot, RESTART_INTERVAL_MS);
}

startBot();
