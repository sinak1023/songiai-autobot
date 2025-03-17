🎁 Sogni.ai Daily Boost Auto Claimer Bot
A Node.js bot that automatically claims the Daily Boost rewards on Sogni.ai, supporting multiple accounts.

🚀 Features
✅ Multi-account support: Automatically claim daily rewards for unlimited accounts.
✅ Timed intervals: 1-minute delay between each account to avoid API limits.
✅ Automatic daily restart: The bot runs every 24 hours automatically.
✅ Simple setup: Easy-to-follow instructions for quick deployment.
✅ Detailed logging: Real-time logs to monitor claiming status.
🛠 Installation & Setup
Step 1: Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/sogni-daily-autoclaimer.git
cd sogni-daily-autoclaimer
Step 2: Install dependencies
Make sure Node.js is installed, then run:

bash
Copy
Edit
npm install axios
Step 3: Add your tokens
Create a file named token.txt in the root folder of the project, and paste your account tokens into it, one token per line:

python-repl
Copy
Edit
token1_here
token2_here
token3_here
...
Step 4: Run the bot
Start the bot using the following command:

bash
Copy
Edit
node bot.js
⏳ Bot Workflow
The bot will load your account tokens and display the number of accounts.
It checks and claims the Daily Boost reward for each account individually.
There will be a 1-minute interval between claims to prevent API issues.
After processing all accounts, the bot will automatically restart every 24 hours.
⚠️ Disclaimer
This bot is intended for educational purposes. Use responsibly, as automation may violate platform rules.

📧 Support
For questions or issues, please create an issue in this repository.

Enjoy your automated claiming! 🎉
