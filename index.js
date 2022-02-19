const { readFileSync } = require('original-fs')
const { Telegraf, Markup } = require('telegraf')

const lodash = require('lodash')
const { sample } = lodash
// const nama = 'harlequinbot' //username bot

const bot = new Telegraf('TOKEN_BOT') //Token BOT
// bot.command('oldschool', (ctx) => ctx.reply('Hello'))

const msg = '🤖 TOD (Truth or Dare) 🤖'
function sendMessage(ctx){
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'Role 🎲', callback_data:'role'}
                ]
            ]
        }
    })
}
bot.start((ctx) => {
    sendMessage(ctx)
})
bot.action('kembali', (ctx) => {
    ctx.deleteMessage()
    sendMessage(ctx)
})
bot.action('role', (ctx) => {
    let rules = `
    [1 - 3 - 5] - Truth\n[2 - 4 - 6] - Dare`
    bot.telegram.sendMessage(ctx.chat.id, rules, {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'Truth 👾', callback_data:'truth'},
                    {text:'Dare ☠', callback_data:'dare'}
                ]
            ]
        }
    })
    ctx.telegram.sendDice(ctx.chat.id)
})
bot.action('truth', (ctx) => {
    ctx.deleteMessage()
    let truth = readFileSync('src/truth.txt','utf8')
    let _truth = sample(truth.split('\n'))
    bot.telegram.sendMessage(ctx.chat.id, _truth, {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'Role 🎲', callback_data:'role'}
                ]
            ]
        }
    })
})
bot.action('dare', (ctx) => {
    ctx.deleteMessage()
    let dare = readFileSync('src/dare.txt','utf8')
    let _dare = sample(dare.split('\n'))
    bot.telegram.sendMessage(ctx.chat.id, _dare, {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'Role 🎲', callback_data:'role'}
                ]
            ]
        }
    })
})
// bot.action('id', (ctx) => {
//     ctx.deleteMessage()
//     bot.telegram.sendMessage(ctx.chat.id, ctx.from.id, {
//         reply_markup:{
//             inline_keyboard:[
//                 [
//                     {text:'Kembali', callback_data:'kembali'}
//                 ]
//             ]
//         }
//     })
// })
// bot.mention(nama, (ctx)=>{
//     sendMessage(ctx)
// })
bot.help(ctx => {
    ctx.reply(`Silahkan /start untuk memulai`)
})
bot.launch()
console.log('run')
