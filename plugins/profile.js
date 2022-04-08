let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, usedPrefix }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: 'Belum Daftar:v',
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        call: 0,
        role: 'Warrior V',
        autolevelup: false,
        pc: 0,
      }
    }
    let { name, limit, exp, lastclaim, registered, regTime, age, level, role, banned } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let res = `http://hardianto-chan.herokuapp.com/api/rankcard?profile=https://i.ibb.co/vQTHzkh/IMG-20210907-WA0721.jpg&name=${name}&bg=https://i.ibb.co/4YBNyvP/images-76.jpg&needxp=${max}&curxp=${exp}&level=${level}&logorank=https://i.ibb.co/Wn9cvnv/FABLED.png`
    let str = `
┌───❑〘 معلومات المستخدم 〙─────
│📛 الاسم : @${who.replace(/@.+/, '')}${about != 401 ? '\n│💋 معلومات : ' + about : ''}
│🏷️ الاسم المسجل : *${registered ? '(' + name + ') ' : ''}
│👁️‍🗨️ العمر : ${registered ? + age : ''}
│🔗 المنشن : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
│💥 الرابط : wa.me/${who.split`@`[0]}
├───────────────────⬡
│💹 الحد الاقصى : *${limit}*
│💱 الدور : *${role}*
│🏧 المستوى : *${level}*
│🏦 النقاط : *${exp} (${exp - min} / ${xp})*
├───────────────────⬡
│💌 الحالة : ${global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) ? 'Premium User' : 'Free User'}
│🚫 محظور : ${banned}
│👨‍ مسجل : ${registered ? 'ايه' : 'لا'}
│⌛ التاريخ التسجيل: ${registered ? ' (' + new Date(regTime).toLocaleString() + ')' : ''}
└───────────────────⬡
╭─────────────────
│ملاحظة: 
│➥شكرا لاستعمال البوت و نتمنى منك الاستمتاع!
│➥نرجو منك عدم الاتصال!
│➥و عدم السبام و ارسال الفيروسات
╰──────────────────
`.trim()
 let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', banned ? 'محظوو' : str, m, false, { contextInfo: { mentionedJid } })
 const button = {
        buttonText: 'ايــانــوكوجــي',
        description: '',
        sections:  [{title: "الرجاء الاختيار ، لا تختار الخطأ", rows: [
        {title: 'القائمة', description: "العودة إلى القائمة الرئيسية", rowId:".?"},
        {title: 'رقم المطور', description: "للتواصل و الاستفسار َ", rowId:".owner"},
       ] }],
        listType: 1
       }
    conn.sendMessage(m.chat, button, MessageType.listMessage, { quoted: m }) 
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^بروفايل?$/i
module.exports = handler
