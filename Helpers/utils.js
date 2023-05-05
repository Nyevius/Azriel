const { clientId, guildId, token } = require("../config.json");

async function getVoiceSessionsForUserInTimeRange(guild, user, startDate, endDate) {
  let sessions = [];
  let voiceStates = guild.voiceStates.cache;
  let voiceChannels = guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE");

  // filter out voice channels the user hasn't connected to
  voiceChannels = voiceChannels.filter(channel => voiceStates.get(user.id)?.channelId === channel.id);

  for (let channel of voiceChannels.values()) {
    let channelData = { name: channel.name, duration: 0 };
    let connectionTimes = [];
    let voiceStateHistory = voiceStates.filter(state => state.userId === user.id && state.channelId === channel.id).array().reverse();

    // get connection times within time range
    for (let i = 0; i < voiceStateHistory.length; i++) {
      let state = voiceStateHistory[i];
      let time = new Date(state.createdAt).getTime();
      if (time > endDate) continue; // voice state was created after end date
      if (i === voiceStateHistory.length - 1) {
        if (time >= startDate) {
          connectionTimes.push(time);
        }
      } else {
        let nextTime = new Date(voiceStateHistory[i + 1].createdAt).getTime();
        if (time < startDate && nextTime > startDate) {
          connectionTimes.push(startDate);
        }
        if (time >= startDate && time <= endDate) {
          connectionTimes.push(time);
        }
        if (time < endDate && nextTime > endDate) {
          connectionTimes.push(endDate);
        }
      }
    }

    // calculate session durations
    for (let i = 0; i < connectionTimes.length; i += 2) {
      let start = connectionTimes[i];
      let end = connectionTimes[i + 1];
      channelData.duration += end - start;
    }

    // add channel data to sessions array
    if (channelData.duration > 0) {
      sessions.push(channelData);
    }
  }

  return sessions;
}

module.exports = { getVoiceSessionsForUserInTimeRange };