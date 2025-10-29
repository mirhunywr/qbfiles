const { cmd } = require('../command');
const axios = require('axios');
const yts = require('yt-search');

cmd({
    pattern: "ytmp4",
    alias: ["video", "song", "ytv"],
    desc: "Download YouTube videos",
    category: "download",
    react: "📹",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎥 Please provide a YouTube video name or URL!\n\nExample: `.video sad song`");

        let url = q;

        // 🔍 If input is not a URL, search YouTube
        if (!q.startsWith('http://') && !q.startsWith('https://')) {
            const search = await yts(q);
            if (!search.videos || search.videos.length === 0) {
                return await reply("❌ No video results found!");
            }
            url = search.videos[0].url;
        }

        // 📸 Send thumbnail & info while downloading
        const searchInfo = await yts(url);
        const videoInfo = searchInfo.videos[0];

        if (videoInfo) {
            await conn.sendMessage(from, {
                image: { url: videoInfo.thumbnail },
                caption: `🎬 *${videoInfo.title}*\n⏰ *Duration:* ${videoInfo.timestamp}\n👀 *Views:* ${videoInfo.views}\n> *📥 Status: Downloading Please Wait...*`
            }, { quoted: mek });
        }

        // 🎬 Fetch video via API
        const api = `https://jawad-tech.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}&quality=360`;
        const res = await axios.get(api);
        const data = res.data;

        if (!data?.status || !data.result) {
            return await reply("❌ Failed to fetch download link from API!");
        }

        const downloadUrl = data.result;
        const metadata = data.metadata;

        await conn.sendMessage(from, {
            video: { url: downloadUrl },
            caption: `🎬 *${metadata?.title || videoInfo?.title || 'YouTube Video'}*\n📥 *Quality:* 360p\n🕒 *Duration:* ${metadata?.duration || videoInfo?.duration?.seconds || 'N/A'}s\n\n> *✅ Download Completed!*\n\n> *QADEER-MD*`
        }, { quoted: mek });

        // ✅ React success
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("❌ Error in .ytmp4:", e);
        await reply("⚠️ Something went wrong! Try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});
