const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const aquali = ["aquali", "vaporeon"];
const cat = ["meow","miaou"];
const susWords = ["sus", "amogus", "sussy baka", "sussy baki"];
const depression = ["depressed", "sad", "depression", "triste", "suicide", "depressif","dépressif"];
const Twitch = ["twitch", "live", "stream"]


client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (message.content.includes("hey bot")){
    message.replay("hello");
  }
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (aquali.some((word) => msg.content.includes(word))) {
    msg.reply(
      "Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more"
    );
  }
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (msg.content.includes("Walter White")) {
    msg.reply(
      "My name is Walter Hartwell White. I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104. This is my confession. If you're watching this tape, I'm probably dead, murdered by my brother-in-law Hank Schrader. Hank has been building a meth empire for over a year now and using me as his chemist. Shortly after my 50th birthday, Hank came to me with a rather, shocking proposition. He asked that I use my chemistry knowledge to cook methamphetamine, which he would then sell using his connections in the drug world. Connections that he made through his career with the DEA. I was... astounded, I... I always thought that Hank was a very moral man and I was... thrown, confused, but I was also particularly vulnerable at the time, something he knew and took advantage of. I was reeling from a cancer diagnosis that was poised to bankrupt my family. Hank took me on a ride along, and showed me just how much money even a small meth operation could make. And I was weak. I didn't want my family to go into financial ruin so I agreed. Every day, I think back at that moment with regret. I quickly realized that I was in way over my head, and Hank had a partner, a man named Gustavo Fring, a businessman. Hank essentially sold me into servitude to this man, and when I tried to quit, Fring threatened my family. I didn't know where to turn. Eventually, Hank and Fring had a falling out. From what I can gather, Hank was always pushing for a greater share of the business, to which Fring flatly refused to give him, and things escalated. Fring was able to arrange, uh I guess you call it a 'hit' on my brother-in-law, and failed, but Hank was seriously injured, and I wound up paying his medical bills which amounted to a little over $177,000. Upon recovery, Hank was bent on revenge, working with a man named Hector Salamanca, he plotted to kill Fring, and did so. In fact, the bomb that he used was built by me, and he gave me no option in it. I have often contemplated suicide, but I'm a coward. I wanted to go to the police, but I was frightened. Hank had risen in the ranks to become the head of the Albuquerque DEA, and about that time, to keep me in line, he took my children from me. For 3 months he kept them. My wife, who up until that point, had no idea of my criminal activities, was horrified to learn what I had done, why Hank had taken our children. We were scared. I was in Hell, I hated myself for what I had brought upon my family. Recently, I tried once again to quit, to end this nightmare, and in response, he gave me this. I can't take this anymore. I live in fear every day that Hank will kill me, or worse, hurt my family. I... All I could think to do was to make this video in hope that the world will finally see this man, for what he really is."
    );
  }
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (cat.some((word) => msg.content.includes(word))) {
    msg.reply(
      "Wowwwww, you meow like a cat! That means you are one, right? Shut the fuck up. If you really want to be put on a leash and treated like a domestic animal then that’s called a fetish, not “quirky” or “cute”. What part of you seriously thinks that any part of acting like a feline establishes a reputation of appreciation? Is it your lack of any defining aspect of personality that urges you to resort to shitty representations of cats to create an illusion of meaning in your worthless life? Wearing “cat ears” in the shape of headbands further notes the complete absence of human attribution to your false sense of personality, such as intelligence or charisma in any form or shape. Where do you think this mindset’s gonna lead you? You think you’re funny, random, quirky even? What makes you think that acting like a fucking cat will make a goddamn hyena laugh? I, personally, feel extremely sympathetic towards you as your only escape from the worthless thing you call your existence is to pretend to be an animal. But it’s not a worthy choice to assert this horrifying fact as a dominant trait, mainly because personality traits require an initial personality to lay their foundation on. You’re not worthy of anybody’s time, so go fuck off, “cat-girl”."
    );
  }
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (susWords.some((word) => msg.content.includes(word))) {
    msg.reply(
      "If you shit in the sink at exactly 4:20 am and yell “amogus” 69 times,a shadowy figured called mom will come to beat you up and you will wake up in a place called the orphanage"
    );
  }
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (depression.some((word) => msg.content.includes(word))) {
    msg.reply(
      "110 reasons to NOT commit suicide :\n. 1. Meeting your soulmate.\n. 2. Going to your friend's weddings.\n. 3. Stargazing.\n. 4. Food.\n. 5. Going to every country.\n. 6. Nice smelling candles.\n. 7. Music.n\.8. Concerts.\n. 9. The people that love you.\n. 10. Snowball fights.\n. 11. Going to the beach.\n. 12. Sunsets.\n. 13. Sunrises.\n. 14. Hiking in Forests.\n. 15. Dogs and Cats and Pets.\n. 16. New movies.\n. 17. Old movies.\n. 18. Going to the drive in theatre.\n. 19. Walking through local markets.\n. 20. Your favorite artists next song.\n. 21. Drawing.\n. 22. Sculpting your own pots.\n. 23. Birthdays.\n. 24. Inside jokes with your friends.\n. 25. That special persons laugh.\n. 26. Warm houses on cold days.\n. 27. Bonfires with smores.\n. 28. Reconnecting with old friends.\n. 29. Smelling flowers.\n. 30. Soft plushies.\n. 31. The smell of fresh baked cookies.\n. 32. Kareoke.\n. 33. Sleepovers.\n. 34. Your favorite videogame.\n. 35. Learning a new language.\n. 36. Long walks on the beach.\n. 37. Seeing every ocean.\n. 38. Squishy bunnies.\n. 39. Going to the store to smell perfumes.\n. 40. Long hot showers.\n. 41. Tea/ coffee/ hot chocolate.\n. 42. Seeing rainbows.\n. 43. Helping wounded animals.\n. 44. Bath bombs.\n. 45. Cleaning the Earth.\n. 46. Getting married.\n. 47. Going to see brodway shows.\n. 48. The sound of rain.\n. 49. Long car rides.\n. 50. Going on a train.\n. 51. Memes.\n. 52. Going to the zoo.\n. 53. Looking at funny art.\n. 54. The smell of old books.\n. 55. Butterflies.\n. 56. Collecting shells.\n. 57. Color.\n. 58. Sending letters.\n. 59. Surprise parties.\n. 60. Warm sheets.\n. 61. Reading.\n. 62. Swimming in the pool at night.\n. 63. Going to diners with friends.\n. 64. Early morning runs.\n. 65. Looking at old photos.\n. 66. Going to a museum.\n. 67. Soft sweaters.\n. 68. Glitter.\n. 69. Going to the aquarium.\n. 70. Hugs.\n. 71. Making snow angels.\n. 72. Holidays.\n. 73. Home cooked meals.\n. 74. Roller coasters.\n. 75. Decorating for parties.\n. 76. Playing pranks on friends.\n. 77. Dancing.\n. 78. Singing in the shower.\n. 79. Seeing your favorite animal in person.\n. 80. Meeting your hero.\n. 81. Bubble wrap.\n. 82. Ice water on hot days.\n. 83. Poetry.\n. 84. Trying on funny clothes.\n. 85. Hanging out with friends.\n. 86. City skylines.\n. 87. Wearing your favorite color.\n. 88. Beautiful wildlife.\n. 89. Collecting stickers.\n. 90. Making some ones day.\n. 91. Laughing so hard you can't breath.\n. 92. Warm blankets fresh from the dryer.\n. 93. Sewing.\n. 94. Seeing the future.\n. 95. Late night convos.\n. 96. Rewatching your favorite show.\n. 97. Blowing Bubblegum.\n. 98. Boardgames.\n. 99. Sitting out in the rain.\n. 100. Bubbles.\n. 101. Cooking new thing.\n. 102. Bob Ross tutorials.\n. 103. Picnics.\n. 104. Tire swings.\n. 105. Old architecture.\n. 106. Reading books.\n. 107. Growing your own food.\n. 108. Clear skies.\n. 109. Baking things you love.\n. 110. Finding new hobbies."
    );
  }
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (Twitch.some((word) => msg.content.includes(word))) {
    msg.reply(
      "Twitch Should Ban The Term “Live-Streaming”.\n. It’s offensive to dead people. My great grandparents are dead and I would like to show them some respect and have twitch ban the term “live-streaming”. It’s a slur used against dead people"
    );
  }
});

client.on("message", msg => {
  if (msg.content.includes("cum")) {
    msg.reply("I've made a severe and continuous lapse in my judgement and I don't expect to be forgiven. I'm simply here to cum. So what we came across that day on the woods was obviously unplanned and the reactions you saw on tape were raw, they were unfiltered. None of us knew how to react or how to feel. I should have never posted the video. I should have put the cameras down, and stopped recording what we were going through. There's a lot of things I should have done differently, but I didn't, and for that from the bottom of my heart, I am sorry. I want to cum to the internet, I want to cum to anyone who's seen the video, I want to cum to anyone who has been affected or touched by mental illness, or depression, or suicide. But, most importantly, I want to cum to the victim and his family. For, my fans, who are defending my actions, please don't, they do not deserve to be defended. The goal of my content is always to entertain, to push the boundaries, to be all inclusive and in the world I live in I share almost everything I do. The intent is never to be heartless, cruel, or malicious. Like I said, I made a huge mistake, I don't expect to be forgiven, I'm just here to cum. I'm ashamed of myself. I'm disappointed in myself, and I promise to be better. I will be better, thank you.");
  }
})

client.on("message", msg => {
  if (msg.content.includes("rat")) {
    msg.reply("ᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷᘛ⁐ᕐᐷ RATS RATS WE ARE THE RATS WE PRAY AT NIGHT WE STALK AT NIGHT WE ARE THE RATS");
  }
})