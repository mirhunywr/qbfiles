const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "🧾",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;

        const menuCaption = `
*╭══════════════════⍟*
*┋❀┃. 𝗤𝗔𝗗𝗘𝗘𝗥-𝗠𝗗 𝗠𝗘𝗡𝗨*
*┋❀┃. Owner :* ${config.OWNER_NAME}
*┋❀┃. Platform :* Heroku
*┋❀┃. Prefix :* ${config.PREFIX}
*┋❀┃. Mode :* ${config.MODE}
*┋❀┃. Version :* 5.0.0 Beta
*┋❀┃. Commands :* ${totalCommands}
*┋❀╰────────────────*
*╰══════════════════⍟*

*╭══════════════════⍟*
*┋❀┃. 01 Download Menu*
*┋❀┃. 02 Group Menu*
*┋❀┃. 03 Fun Menu*
*┋❀┃. 04 Owner Menu*
*┋❀┃. 05 AI Menu*
*┋❀┃. 06 Anime Menu*
*┋❀┃. 07 Convert Menu*
*┋❀┃. 08 Other Menu*
*┋❀┃. 09 Reactions Menu*
*┋❀┃. 10 Main Menu*
*┋❀╰────────────────*
*╰══════════════════⍟*
> 𝐐𝐀𝐃𝐄𝐄𝐑 𝐁𝐑𝐀𝐇𝐕𝐈`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363418885465903@newsletter',
                newsletterName: config.OWNER_NAME,
                serverMessageId: 143
            }
        };

        // Send menu image
        let sentMsg;
        try {
            sentMsg = await conn.sendMessage(
                from,
                {
                    image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/eth3xg.jpg' },
                    caption: menuCaption,
                    contextInfo
                },
                { quoted: mek }
            );
        } catch {
            sentMsg = await conn.sendMessage(
                from,
                { text: menuCaption, contextInfo },
                { quoted: mek }
            );
        }

        const messageID = sentMsg.key.id;

        // Menus data
        const menuData = {
            '1': {
                title: "Download Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗠𝗲𝗻𝘂*
*┋❀┃. facebook [url]*
*┋❀┃. mediafire [url]*
*┋❀┃. tiktok [url]*
*┋❀┃. twitter [url]*
*┋❀┃. insta [url]*
*┋❀┃. ytmp3 [url]*
*┋❀┃. ytmp4 [url]*
*┋❀┃. song [name]*
*┋❀┃. drama [name]*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '2': {
                title: "Group Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗚𝗿𝗼𝘂𝗽 𝗠𝗲𝗻𝘂*
*┋❀┃. promote @user*
*┋❀┃. demote @user*
*┋❀┃. add @user*
*┋❀┃. remove @user*
*┋❀┃. hidetag [msg]*
*┋❀┃. tagall*
*┋❀┃. lockgc*
*┋❀┃. unlockgc*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '3': {
                title: "Fun Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗙𝘂𝗻 𝗠𝗲𝗻𝘂*
*┋❀┃. joke*
*┋❀┃. rate @user*
*┋❀┃. hack @user*
*┋❀┃. ship @user1 @user2*
*┋❀┃. insult @user*
*┋❀┃. pickup*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '4': {
                title: "Owner Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂*
*┋❀┃. block @user*
*┋❀┃. unblock @user*
*┋❀┃. restart*
*┋❀┃. shutdown*
*┋❀┃. fullpp [img]*
*┋❀┃. updatecmd*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '5': {
                title: "AI Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗔𝗜 𝗠𝗲𝗻𝘂*
*┋❀┃. ai [query]*
*┋❀┃. gpt [query]*
*┋❀┃. gptmini [query]*
*┋❀┃. imagine [text]*
*┋❀┃. blackbox [query]*
*┋❀┃. meta [query]*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '6': {
                title: "Anime Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗔𝗻𝗶𝗺𝗲 𝗠𝗲𝗻𝘂*
*┋❀┃. animegirl*
*┋❀┃. waifu*
*┋❀┃. neko*
*┋❀┃. foxgirl*
*┋❀┃. loli*
*┋❀┃. naruto*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '7': {
                title: "Convert Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗠𝗲𝗻𝘂*
*┋❀┃. sticker [img]*
*┋❀┃. emojimix 😎+😂*
*┋❀┃. take [name,text]*
*┋❀┃. tomp3 [video]*
*┋❀┃. fancy [text]*
*┋❀┃. base64 [text]*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '8': {
                title: "Other Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗢𝘁𝗵𝗲𝗿 𝗠𝗲𝗻𝘂*
*┋❀┃. timenow*
*┋❀┃. date*
*┋❀┃. count [num]*
*┋❀┃. fact*
*┋❀┃. movie [name]*
*┋❀┃. weather [city]*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '9': {
                title: "Reactions Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗥𝗲𝗮𝗰𝘁𝗶𝗼𝗻𝘀 𝗠𝗲𝗻𝘂*
*┋❀┃. hug @user*
*┋❀┃. kiss @user*
*┋❀┃. slap @user*
*┋❀┃. pat @user*
*┋❀┃. kill @user*
*┋❀┃. poke @user*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            },
            '10': {
                title: "Main Menu",
                content: `
*╭══════════════════⍟*
*┋❀┃. 𝗠𝗮𝗶𝗻 𝗠𝗲𝗻𝘂*
*┋❀┃. ping*
*┋❀┃. alive*
*┋❀┃. uptime*
*┋❀┃. owner*
*┋❀┃. repo*
*┋❀╰────────────────*
*╰══════════════════⍟*
> ${config.DESCRIPTION}`
            }
        };

        // Handler for replies
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message) return;
                const isReply = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                if (!isReply) return;

                const userInput = receivedMsg.message.conversation ||
                    receivedMsg.message.extendedTextMessage?.text;

                const sender = receivedMsg.key.remoteJid;
                const selected = menuData[userInput];

                if (selected) {
                    await conn.sendMessage(
                        sender,
                        { text: selected.content, contextInfo },
                        { quoted: receivedMsg }
                    );
                } else {
                    await conn.sendMessage(
                        sender,
                        {
                            text: `❌ Invalid Option ❌\nPlease reply with 1–10 to select a menu.\n> ${config.DESCRIPTION}`,
                            contextInfo
                        },
                        { quoted: receivedMsg }
                    );
                }
            } catch (e) {
                console.log('Error:', e);
            }
        };

        conn.ev.on("messages.upsert", handler);
        setTimeout(() => conn.ev.off("messages.upsert", handler), 300000);

    } catch (e) {
        console.error('Menu Error:', e);
    }
});