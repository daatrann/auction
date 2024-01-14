const { CronJob } = require("cron");
const _ = require("lodash");
const { checkTxnToUpdate } = require("./transaction_components/transaction.service");
const {
    createNFT,
    mintNFT,
    editNFT,
    viewNFT,
} = require("./asset_components/asset.service");

const TIME_ZONE = {
    VN_TZ: "Asia/Ho_Chi_Minh",
};

console.log("CRON RUNNING");

const runCronTxJob = () => {
    console.log('running')
    try {
        new CronJob({
            /* at every minute check status transaction to update db */
            cronTime: "* * * * *",
            onTick() {
                checkTxnToUpdate();
            },
            start: true,
            timeZone: TIME_ZONE.VN_TZ,
        }).start();
    } catch (error) {
        throw new Error(error);
    }
};

// const runCronMintNFTJob = () => {
//     try {
//         new CronJob({
//             /* at 2:30AM every day check available market to update db */
//             cronTime: "30 2 * * *",
//             onTick() {
//               createNFT();
//             },
//             start: true,
//             timeZone: TIME_ZONE.VN_TZ,
//         }).start();
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const runCronListingNFTJob = () => {
//   try {
//     new CronJob({
//       /* at every 5 minutes list market to update db */
//       cronTime: '*/5 * * * *',
//       onTick() {
//         listNft()
//       },
//       start: true,
//       timeZone: TIME_ZONE.VN_TZ,
//     }).start()

//   } catch (error) {
//     throw new Error(error);
//   }
// }

// const runResetDataLeaderBoard = () => {
//   try {
//     new CronJob({
//       /* at 0:00AM every day reset data leader board */
//       cronTime: '0 0 * * *',
//       onTick() {
//         resetDataLeaderBoard()
//       },
//       start: true,
//       timeZone: TIME_ZONE.VN_TZ,
//     }).start()

//   } catch (error) {
//     throw new Error(error);
//   }
// }

module.exports = {
    runCronTxJob
    //,runCronMintNFTJob,
    //   ,runCronListingNFTJob,
    //   runResetDataLeaderBoard
};