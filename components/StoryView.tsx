'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Flame, Skull, Globe, Zap, BookOpen, Sparkles, Crown } from 'lucide-react';
import { LanguageCode } from '../types';

interface StoryViewProps {
  onBack?: () => void;
  initialData?: any;
}

// 章のデータ - 壮大なサガ
const chapters = [
  {
    id: 'prologue',
    icon: <Flame className="w-6 h-6" />,
    title: { 
      ja: '序章：傲慢な勘違いと、新宿の影', 
      en: 'Prologue: The Shadow of Shinjuku' 
    },
    year: '1995',
    bgColor: 'from-slate-950 via-zinc-900 to-slate-950',
    accentColor: 'text-zinc-400',
    quote: {
      ja: '「本気を出せば、僕は誰よりも一番になれる」',
      en: '"If I tried, I could be number one."'
    },
    content: {
      ja: `1995年6月1日。コンクリートとネオンが支配する街、新宿。
そこで生まれた一人の少年は、幼い頃からある「勘違い」の中で生きていた。

「本気を出せば、僕は誰よりも一番になれる」

それは神童としての自覚ではない。根拠のない万能感と、傷つくことを極端に恐れる臆病なプライドが混ざり合った自己防衛だった。

だからこそ、少年は「努力」という行為を心の底から軽蔑した。

「必死に汗をかくなんてダサい。才能のない奴がやることだ」

もし本気で努力して、それでも一番になれなかったら？
その時こそ、自分の無能さが証明されてしまう。
だから少年は、「僕はまだ本気を出していないだけ」という鎧をまとい、斜に構えて世界を見下ろした。

彼が見る新宿は、日本の中心だった。
だが、そのさらに奥には常に「アメリカ」という巨大な影があった。

ニュースも、政治も、カルチャーも、大人たちはみな海の向こうの顔色を窺っている。

「ここは植民地なのか？ なぜ僕たちは世界の主役じゃない？」

日本 vs アメリカ。
幼い心に刻まれたその競争図は、やがて「いつかこの歪んだ世界をひっくり返してやる」という、静かだが激しい闘争心へと変わっていった。`,
      en: `June 1st, 1995. Shinjuku—a city ruled by concrete and neon.

A boy was born there, living inside a "delusion" from an early age.

"If I tried, I could be number one."

This wasn't the awareness of a prodigy. It was self-defense—a mix of baseless omnipotence and cowardly pride, desperately afraid of being hurt.

That's why the boy despised "effort" from the bottom of his heart.

"Sweating desperately is uncool. That's what talentless people do."

What if he tried his hardest and still couldn't be number one?
That would prove his incompetence.
So the boy wore the armor of "I just haven't tried yet" and looked down at the world with cynical eyes.

The Shinjuku he saw was Japan's center.
But behind it always loomed a massive shadow—America.

News, politics, culture—all the adults were watching that country across the ocean.

"Is this a colony? Why aren't we the protagonists of the world?"

Japan vs America.
That competitive framework, carved into his young heart, would eventually transform into a quiet but fierce fighting spirit: "Someday, I'll flip this distorted world upside down."`
    }
  },
  {
    id: 'drifter',
    icon: <Globe className="w-6 h-6" />,
    title: { 
      ja: '第1章：11歳の放浪と、残酷なフォアグラ', 
      en: 'Chapter 1: The Boy Drifter' 
    },
    year: '2006',
    bgColor: 'from-slate-950 via-amber-950/30 to-slate-950',
    accentColor: 'text-amber-400',
    quote: {
      ja: '「お前らのルールでは生きない」',
      en: '"I won\'t live by your rules."'
    },
    content: {
      ja: `11歳。学校という「右向け右」のシステムへの違和感は頂点に達した。

「お前らのルールでは生きない」

不登校を宣言した少年は、自由の象徴であるアメリカへの渡航を画策するが、「15歳未満の単独渡航不可」というルールに阻まれる。

行き場を失ったエネルギーは、国内への放浪へと向かった。
バックパック一つで飛び出した11歳の旅。

京都、奈良。
幼い少年は、寺院の静寂や、古都の路地に漂う空気に、不思議な震えを覚えた。
千年の時を超えて息づく「和」の精神。まだ言葉にはできなかったが、自分のルーツがここにあることを魂が感知していた。

そして静岡。車窓から見えた富士山。
その圧倒的な高さ、揺るぎない裾野の広さ。

「俺はこれになる。必ず何かで日本一になる」

少年は車窓に額を押し付け、誓いを立てた。

だが、大阪での夜が、少年の心に決定的な楔（くさび）を打ち込む。

親の金を使い、一人で高級ホテルに泊まり、ウェイターにかしずかれてフォアグラを食べた。
「金さえあれば自由だ」。そう酔いしれた直後、街角でタクシー運転手に言い放たれた一言。

「ガキは歩け」

衝撃だった。金を持っているのに。客なのに。
社会には「金」だけでは越えられない壁がある。どんなに高い飯を食っても、今の自分はただの「無力な子供」だ。

「見てろよ。いつか誰にも無視できないほどの力を手に入れてやる」

その屈辱が、彼を修羅の道へと駆り立てた。`,
      en: `Age 11. His discomfort with school—that "turn right when told" system—reached its peak.

"I won't live by your rules."

The boy declared he wouldn't attend school. He planned to travel to America, the symbol of freedom, but was blocked by rules: "No solo travel under 15."

His pent-up energy turned toward domestic wandering.
An 11-year-old's journey with just a backpack.

Kyoto, Nara.
The young boy felt a strange trembling in the silence of temples and the air of ancient alleys.
The spirit of "Wa," breathing across a thousand years. He couldn't put it into words yet, but his soul sensed his roots were here.

Then Shizuoka. Mount Fuji, seen from the train window.
Its overwhelming height, its unwavering base.

"I'll become this. I'll definitely become number one at something in Japan."

The boy pressed his forehead against the window and made his vow.

But a night in Osaka drove a decisive wedge into his heart.

Using his parents' money, he stayed alone at a luxury hotel, was served by waiters, and ate foie gras.
"With money, I'm free." Just as he was intoxicated by this thought, a taxi driver on the street corner said:

"Kids should walk."

It was a shock. He had money. He was a customer.
Society has walls that money alone can't overcome. No matter how expensive the meal, he was still just a "powerless child."

"Just watch me. Someday I'll gain power that no one can ignore."

That humiliation drove him onto the path of the warrior.`
    }
  },
  {
    id: 'neo-outlaw',
    icon: <Crown className="w-6 h-6" />,
    title: { 
      ja: '第2章：新宿のネオアウトロー', 
      en: 'Chapter 2: The Neo-Outlaw' 
    },
    year: '2013-2015',
    bgColor: 'from-slate-950 via-rose-950/30 to-slate-950',
    accentColor: 'text-rose-400',
    quote: {
      ja: '「俺についてくれば、お前らも王になれる」',
      en: '"Follow me, and you too can be kings."'
    },
    content: {
      ja: `10代後半から20代。舞台は再び新宿。
少年はもう子供ではなかった。

彼は「ヤンキー」という枠を超え、ビジネスとストリートの論理を併せ持つ「ネオアウトロー」として夜の街に君臨した。

服の転売、イベントオーガナイズ、パチンコの打ち子集団の統率。
ビジネスは拡大し、動かす金は膨れ上がった。

彼はその金を自分の享楽のためだけでなく、先輩や仲間たちへの投資にも回した。
「俺が食わせてやる」。その気概が人を集めた。

さらに調子に乗った彼は、キャバクラやバーの経営にも乗り出す。
夜の世界のドロドロとした欲望と、裏切りの味。
清濁併せ呑みながら、彼は18歳で最初の会社を作った。

20歳になる頃、彼は絶頂にいた。

移動は運転手付きの車。住まいは「芸能人が住みたいマンションランキング1位」のタワーマンション。
全国雑誌に「新宿の若き顔役」として掲載され、与沢翼モデルを模倣した「ヤンキー100人セミナー」を開催した。

「俺についてくれば、お前らも王になれる」

虚像を売り、熱狂を作り出し、巨万の富を動かす。
彼は自分が世界のルールブックになったと錯覚していた。
数字だけを追い、中身のない拡大を続けた。

だが、その足元は砂上の楼閣だった。

崩壊の足音は、すぐそこまで迫っていた。`,
      en: `Late teens to early twenties. The stage was once again Shinjuku.
The boy was no longer a child.

He transcended the "yankee" label, reigning over the night city as a "Neo-Outlaw"—wielding the logic of both business and the streets.

Reselling clothes, organizing events, managing gambling worker groups.
Business expanded. The money he moved swelled.

He invested that money not just in his own pleasure, but in his seniors and comrades.
"I'll feed you all." That spirit gathered people around him.

Growing bolder, he ventured into running hostess clubs and bars.
The murky desires of the night world, the taste of betrayal.
Swallowing the good with the bad, he founded his first company at 18.

By 20, he was at his peak.

He traveled in a chauffeured car. He lived in a tower apartment ranked "#1 where celebrities want to live."
He was featured in national magazines as "Shinjuku's young boss" and held "100 Yankee Seminars" modeled after Tsubasa Yozawa.

"Follow me, and you too can be kings."

Selling illusions, creating fervor, moving vast fortunes.
He believed he had become the world's rulebook.
Chasing only numbers, continuing hollow expansion.

But his foundation was a castle built on sand.

The footsteps of collapse were closing in.`
    }
  },
  {
    id: 'guillotine',
    icon: <Skull className="w-6 h-6" />,
    title: { 
      ja: '第3章：1000倍の幻影と、最後の綱の切断', 
      en: 'Chapter 3: The Double Guillotine' 
    },
    year: '2016-2018',
    bgColor: 'from-slate-950 via-red-950/40 to-slate-950',
    accentColor: 'text-red-500',
    quote: {
      ja: '「あぁ……」',
      en: '"Ah......"'
    },
    content: {
      ja: `運命の歯車が狂い始める。

ADAコイン。仮想通貨の黎明期。
彼は仲間から金を集め、プレセールスに全突っ込みをした。
当時の彼の読みは浅かった。「まあ、10倍か20倍にはなるだろう」。

翌朝、世界は反転した。

仲介人の持ち逃げ。そして1億円の負債。
王の生活は一夜にして崩壊した。タワマンを追われ、自転車操業の日々。
生きるために嘘をつき、凶悪化する性格。そしてトドメの20トンのトラックとの衝突事故。

地獄の底で、彼は喘いでいた。

だが、人間とはしぶといものだ。
事故から時間が経ち、体が少し動き始めると、微かな希望を持ち始めた。

「よし、これからだ。まだ俺には保険金がある。あれが入れば、借金を返して再スタートできる！」

まさに「ここから這い上がるぞ！」と意気込んだ、その時だった。

弁護士からの冷酷な通知。

「保険金は下りません」

目の前が真っ暗になった。最後の命綱、唯一の希望の光が、プツンと切られた瞬間だった。

「なんでだ……俺が何をしたって言うんだ」

さらに、追い打ちをかける出来事が起きる。

絶望の中で、ふと気になってADAコインの価格を確認した。

「あれからだいぶ経った。もし持っていたら、いくらになっていたんだろう」

画面を見た瞬間、呼吸が止まった。

10倍？ 20倍？

違う。

1000倍以上になっていた。

「あぁ……」

声にならない呻き。もし騙されていなければ。もし持っていれば。
1000億円以上の資産が、自分の手の中にあったはずなのだ。

「これからだ！」と顔を上げた瞬間に叩き落とされた保険金の絶望。
「実は勝っていた」と知った瞬間に味わった1000倍の喪失感。

この二つの落差が、彼を完全に破壊した。`,
      en: `The gears of fate began to malfunction.

ADA Coin. The dawn of cryptocurrency.
He gathered money from comrades and went all-in on the presale.
His analysis was shallow then. "Well, it'll probably 10x or 20x."

The next morning, the world flipped.

The middleman absconded. 100 million yen in debt.
His king's life collapsed overnight. Evicted from the tower, living day-to-day.
Lying to survive, his personality turning vicious. Then the final blow—a collision with a 20-ton truck.

At the bottom of hell, he was gasping.

But humans are tenacious.
As time passed after the accident and his body began to move again, he started to hold faint hope.

"Alright, here we go. I still have the insurance money. When that comes through, I can pay off debts and restart!"

Just as he was pumping himself up—"I'll crawl back from here!"—that's when it came.

The cold notice from the lawyer.

"The insurance claim has been denied."

Everything went dark. The last lifeline, the only ray of hope, was cut in an instant.

"Why... What did I ever do?"

Then came another devastating blow.

In his despair, he casually checked the price of ADA Coin.

"It's been a while since then. If I'd held, how much would it be worth now?"

The moment he saw the screen, he stopped breathing.

10x? 20x?

No.

Over 1000x.

"Ah......"

A groan that couldn't become words. If he hadn't been scammed. If he had held.
Over 100 billion yen in assets should have been in his hands.

The despair of being struck down by the insurance denial the moment he raised his head saying "Here we go!"
The 1000x loss felt the moment he learned "I had actually won."

The gap between these two crushed him completely.`
    }
  },
  {
    id: 'bookstore',
    icon: <BookOpen className="w-6 h-6" />,
    title: { 
      ja: '第4章：北の果ての書店と、言語への屈辱', 
      en: 'Chapter 4: The Bookstore & The Language' 
    },
    year: '2018-2019',
    bgColor: 'from-slate-950 via-blue-950/30 to-slate-950',
    accentColor: 'text-blue-400',
    quote: {
      ja: '「英語ができなければ、世界という土俵にすら上がれない」',
      en: '"Without English, I can\'t even step into the world\'s arena."'
    },
    content: {
      ja: `東京にいられなくなった彼は、北へ逃げた。

北海道。
家はない。宿を取る金もない。ホームレスとなった彼がようやく身を寄せたのは、薄暗い漫画喫茶だった。

だが、彼はそこで漫画を読まなかった。
空いている時間は、書店へ行って立ち読みをした。

そこで彼はある残酷な事実に気づく。

棚に並ぶビジネス書、成功法則、エリートたちの回顧録。ハーバード、MBA、留学経験、外資系金融……。

「なんだ、これは」

結局、日本のエリートたちも、世界を見ているようで、実はアメリカしか見ていない。
新宿で感じた「アメリカの影」は、日本の知性そのものを覆っていたのだ。

当時の彼は、英語を学ぶことすら拒絶していた。

「俺が偉くなれば、通訳を雇えばいい。なんで俺が他国の言葉に合わせなきゃいけないんだ」

そう思っていた。だが、心の奥底には強烈なコンプレックスがあった。

「日本人は舐められている」

その感覚が大嫌いだった。だからこそ、虚勢を張っていた。

だが、書店で現実を知り、彼は認めた。

「英語ができなければ、世界という土俵にすら上がれない」

屈辱を飲み込み、彼は小樽のゲストハウスへ向かった。`,
      en: `Unable to stay in Tokyo, he fled north.

Hokkaido.
No home. No money for lodging. Now homeless, he finally found shelter in a dim manga café.

But he didn't read manga there.
In his free time, he went to bookstores to read standing.

There, he noticed a cruel truth.

Business books lining the shelves, success formulas, memoirs of elites. Harvard, MBA, study abroad, foreign finance...

"What is this?"

In the end, Japan's elites also appeared to be looking at the world, but they were actually only looking at America.
The "shadow of America" he felt in Shinjuku had covered Japan's entire intellect.

At the time, he even refused to learn English.

"When I'm powerful, I'll just hire interpreters. Why should I adapt to another country's language?"

That's what he thought. But deep down, there was an intense complex.

"Japanese people are looked down upon."

He hated that feeling. That's why he was putting up a front.

But learning the reality at the bookstore, he admitted it.

"Without English, I can't even step into the world's arena."

Swallowing his humiliation, he headed to a guesthouse in Otaru.`
    }
  },
  {
    id: 'global-paradox',
    icon: <Globe className="w-6 h-6" />,
    title: { 
      ja: '第5章：世界を知り、日本を知る', 
      en: 'Chapter 5: The Global Paradox' 
    },
    year: '2019-2020',
    bgColor: 'from-slate-950 via-emerald-950/30 to-slate-950',
    accentColor: 'text-emerald-400',
    quote: {
      ja: '「日本には世界が必要としている『何か』がある」',
      en: '"Japan has \'something\' the world needs."'
    },
    content: {
      ja: `小樽で出会ったオーストラリア人やフランス人。
彼らと拙い英語で話すうちに、彼の価値観は揺らいだ。

「世界はアメリカだけじゃない」

彼らの自由さ、視座の高さ。
かつての「日本人は舐められている」という怒りは、いつしか「日本より世界の方が凄い」という思想へと変わっていった。

「俺は世界に出る。日本なんか捨ててやる」

彼は海を渡った。タイ、そしてヨーロッパへ。

だが、旅を続け、現地の人々と深く関わる中で、不思議な現象が起きた。
世界中の人々が、彼に向かって口々に言うのだ。

「日本は素晴らしい国だ」
「日本人は高潔だ」

彼らが語る日本は、彼自身が捨てようとしていた日本とは違っていた。

そしてタイでの瞑想修行。
静寂の中で自分を見つめ直した時、彼は気づいた。

「俺たちが当たり前だと思っていた『平和』や『安全』は、世界では奇跡に近いことなんだ」

外から日本を見たことで初めて、彼は日本の真の価値を知った。

温故知新。
古き良き日本の心を尊びながら、世界のリアルな状況も肌で感じる。

「日本が世界に劣っているわけじゃない。日本には世界が必要としている『何か』がある」`,
      en: `Australians and French people he met in Otaru.
As he spoke with them in his broken English, his values began to shake.

"The world isn't just America."

Their freedom, their high perspective.
His former anger that "Japanese people are looked down upon" gradually transformed into the thought that "the world is greater than Japan."

"I'm going out into the world. I'll abandon Japan."

He crossed the ocean. To Thailand, then to Europe.

But as he continued his travels, deeply engaging with local people, a strange phenomenon occurred.
People from all over the world kept telling him:

"Japan is a wonderful country."
"Japanese people are noble."

The Japan they spoke of was different from the Japan he was trying to abandon.

Then came meditation practice in Thailand.
When he reflected on himself in silence, he realized:

"The 'peace' and 'safety' we took for granted are nearly miraculous in the world."

By seeing Japan from outside for the first time, he discovered Japan's true value.

Revisiting the old to understand the new.
Honoring traditional Japanese spirit while feeling the world's real situation firsthand.

"Japan isn't inferior to the world. Japan has 'something' the world needs."`
    }
  },
  {
    id: 'ai-paradox',
    icon: <Zap className="w-6 h-6" />,
    title: { 
      ja: '第6章：AIの衝撃、絶望と希望の狭間', 
      en: 'Chapter 6: The AI Paradox' 
    },
    year: '2021-2023',
    bgColor: 'from-slate-950 via-purple-950/30 to-slate-950',
    accentColor: 'text-purple-400',
    quote: {
      ja: '「俺はAIを使って世界を変える側になるんだ」',
      en: '"I\'ll become one who changes the world using AI."'
    },
    content: {
      ja: `帰国した彼は、京都にいた。

かつての「新宿の顔役」の面影はない。ウーバーイーツのバッグを背負い、顔を隠し、下を向いて歩いた。
毎日の参拝と瞑想だけが、ギリギリで精神を繋ぎ止めていた。

ある日、平安神宮の横にある図書館に入った。
そこで、運命の一冊に出会う。
『プログラミングは世界を変える』

雷に打たれたようだった。かつてADAコインで技術を知らずに負けた悔しさが蘇る。
「これしかない。これで食っていくんだ」

そこからは狂気のような没頭だった。

統計学、データサイエンスの可能性を知り、Python、MeCab、PyTorch、TensorFlow……。
難解な数式とコード。脳が焼き切れるような努力。
「これを習得すれば、俺は特別な人材になれる。この技術は俺だけの武器になる」
そう信じて、歯を食いしばって積み上げた。

だが、運命はまたしても彼を試す。

ChatGPTの登場。

世界が沸き立つ中、彼は膝から崩れ落ちそうになった。

「嘘だろ……」

彼が血の滲むような思いで学んだ自然言語処理やコード生成が、チャット画面一つで、誰でも、一瞬でできてしまう。

「俺が積み上げてきたものは、無駄だったのか？」
「俺の専門性は、AIに奪われたのか？」

落胆。虚無感。時代の進化は残酷なまでに速い。

しかし、その絶望の淵で、彼はもう一つの事実に気づく。

「待てよ……」

「逆に考えれば、このAIを使えば、俺一人でも巨大なシステムが作れるんじゃないか？」

演出ができずに諦めた動画制作も、一人では限界があったシステム開発も。
AIという「最強の相棒」がいれば、俺の頭の中にある構想（ヴィジョン）をすべて現実に実装できる。

落胆は、強烈な希望へと変わった。

「俺はAIに使われる側じゃない。AIを使って世界を変える側（アーキテクト）になるんだ」`,
      en: `After returning to Japan, he was in Kyoto.

No trace of the former "Shinjuku boss." Carrying an Uber Eats bag, face hidden, walking with head down.
Only daily shrine visits and meditation barely kept his mind together.

One day, he entered a library next to Heian Shrine.
There, he encountered a fateful book.
"Programming Changes the World."

It was like being struck by lightning. The frustration of losing on ADA Coin without understanding technology resurged.
"This is it. This is how I'll survive."

From there, it was obsessive immersion.

Learning statistics, the possibilities of data science—Python, MeCab, PyTorch, TensorFlow...
Difficult formulas and code. Brain-burning effort.
"If I master this, I'll become a special talent. This technology will be my weapon alone."
Believing that, he gritted his teeth and built up.

But fate tested him once again.

The arrival of ChatGPT.

As the world buzzed with excitement, he nearly collapsed to his knees.

"This can't be real..."

The natural language processing and code generation he had learned with blood-sweating effort—anyone could do it instantly through a chat screen.

"Was everything I built up meaningless?"
"Has AI stolen my expertise?"

Disappointment. Emptiness. The evolution of the era was cruelly fast.

However, at the edge of that despair, he noticed another truth.

"Wait..."

"If I think about it the other way, couldn't I use this AI to build massive systems by myself?"

Video production he'd given up because he couldn't do the effects alone. System development that had limits for one person.
With AI as the "ultimate partner," he could implement all the visions in his head into reality.

Disappointment transformed into intense hope.

"I'm not on the side that gets used by AI. I'll become an Architect—one who uses AI to change the world."`
    }
  },
  {
    id: 'return',
    icon: <Sparkles className="w-6 h-6" />,
    title: { 
      ja: '第7章：再会、そして尊厳の回復', 
      en: 'Chapter 7: The Return & Reconnection' 
    },
    year: '2023-',
    bgColor: 'from-slate-950 via-amber-950/40 to-slate-950',
    accentColor: 'text-amber-400',
    quote: {
      ja: '「俺がやるしかない」',
      en: '"I have to be the one."'
    },
    content: {
      ja: `コロナが明けた。

彼は再び海を渡った。タイへ、そして行けなかったノルウェーへ。
ヨーロッパ各地を巡り、かつて自分を信じてくれた仲間たちと再会した。

「お帰り、Ko」

彼らは変わらず温かかった。だが、一つだけ変わったことがあった。

彼自身だ。

もう「何者かになりたい放浪者」ではない。
「技術とビジョンを持ったアーキテクト」として、彼らの前に立っていた。

そこで彼は改めて確信した。

世界は日本を愛している。リスペクトしている。
だが、日本自身がそれを安売りし、自信を失い、搾取されている。

外国人ガイドが日本の文化をあいまいに説明し、利益は外国企業へ流れる。
日本人の「謙虚さ」が「弱さ」として利用されている。

「俺がやるしかない」

「俺たちが主体となって、正しく日本を伝え、対等に交流する場を作らなければ、日本の尊厳が失われる」

これは復讐ではない。
これは使命だ。

かつて新宿で誓った「世界をひっくり返す」という夢。
それが今、形を変えて蘇った。

日本の本当の価値を、日本人の手で、世界に届ける。
「The Architect」としての旅が、今始まる。`,
      en: `The pandemic ended.

He crossed the ocean again. To Thailand, then to Norway—a place he'd never been.
Traveling through Europe, he reunited with comrades who had once believed in him.

"Welcome back, Ko."

They were as warm as ever. But one thing had changed.

Himself.

He was no longer a "wanderer wanting to become something."
He stood before them as an "Architect with technology and vision."

There, he reconfirmed his conviction.

The world loves Japan. Respects it.
But Japan itself undersells this, loses confidence, and gets exploited.

Foreign guides vaguely explaining Japanese culture, profits flowing to foreign companies.
Japanese people's "humility" being exploited as "weakness."

"I have to be the one."

"Unless we take the initiative to properly convey Japan and create spaces for equal exchange, Japan's dignity will be lost."

This isn't revenge.
This is a mission.

The dream he swore in Shinjuku—to "flip the world upside down."
It has now resurrected in a new form.

Delivering Japan's true value to the world, by Japanese hands.
The journey as "The Architect" begins now.`
    },
    cta: true
  }
];

// 各章のコンポーネント
interface ChapterProps {
  chapter: typeof chapters[0];
  lang: LanguageCode;
  index: number;
  isLast: boolean;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, lang, index, isLast }) => {
  const displayLang = lang === 'ja' ? 'ja' : 'en';
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  return (
    <motion.section
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative bg-gradient-to-b ${chapter.bgColor} overflow-hidden`}
    >
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="max-w-4xl mx-auto px-6 py-32 relative z-10"
        style={{ opacity, y }}
      >
        {/* 年代と章番号 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className={`w-12 h-12 rounded-full border border-current/30 flex items-center justify-center ${chapter.accentColor}`}>
            {chapter.icon}
          </div>
          <div className="flex flex-col">
            <span className={`text-3xl font-bold tracking-tight ${chapter.accentColor}`}>
              {chapter.year}
            </span>
            <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
              {index === 0 ? 'Prologue' : `Chapter ${String(index).padStart(2, '0')}`}
            </span>
          </div>
        </motion.div>

        {/* タイトル */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
        >
          {chapter.title[displayLang]}
        </motion.h2>

        {/* 印象的な引用 */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`text-2xl md:text-3xl font-serif italic ${chapter.accentColor} mb-12 border-l-4 border-current/50 pl-6`}
        >
          {chapter.quote[displayLang]}
        </motion.blockquote>

        {/* 本文 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          <div className="text-white/75 text-lg md:text-xl leading-[2.2] whitespace-pre-line font-serif">
            {chapter.content[displayLang].split('\n\n').map((paragraph, i) => (
              <motion.p 
                key={i} 
                className="mb-8 last:mb-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* CTA (最後の章のみ) */}
        {chapter.cta && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <p className="text-white/50 font-serif italic text-xl mb-8 text-center">
              {lang === 'ja' 
                ? '— The Architect\'s Saga は、まだ途中だ —' 
                : '— The Architect\'s Saga continues —'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://matsuri.group/ja"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white font-serif text-lg rounded-lg overflow-hidden shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all"
              >
                <span className="relative z-10">
                  {lang === 'ja' ? 'Matsuriを体験する' : 'Experience Matsuri'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://twitter.com/zes55ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-amber-400 font-serif italic transition-colors text-lg"
              >
                {lang === 'ja' ? 'X (Twitter) →' : 'X (Twitter) →'}
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 章の区切り */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </motion.section>
  );
};

const StoryView: React.FC<StoryViewProps> = ({ onBack, initialData }) => {
  const [lang, setLang] = useState<LanguageCode>('ja');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative bg-slate-950 text-white overflow-x-hidden">
      {/* スクロールプログレス */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 z-50"
        style={{ width: progressWidth }}
      />

      {/* ナビゲーション */}
      <nav className="fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-center bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent backdrop-blur-md">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>戻る</span>
          </button>
        ) : (
          <a
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </a>
        )}

        <button
          onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
          className="text-xs font-mono text-amber-400 border border-amber-400/30 px-4 py-2 rounded-full hover:bg-amber-400/10 transition-colors backdrop-blur-sm"
        >
          {lang === 'ja' ? 'EN' : 'JA'}
        </button>
      </nav>

      {/* ヒーローセクション */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 overflow-hidden">
        {/* 背景グラデーション */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.15)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(220,38,38,0.10)_0%,_transparent_50%)]" />
        </div>

        {/* 装飾ライン */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative z-10 px-6 max-w-4xl"
        >
          {/* サブタイトル */}
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-amber-400/80 font-serif italic text-sm tracking-[0.5em] mb-8 block uppercase"
          >
            The Architect's Saga
          </motion.span>

          {/* メインタイトル */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6"
          >
            My Story
          </motion.h1>

          {/* サブタイトル */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-white/50 font-serif text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {lang === 'ja' 
              ? '1000億の幻影とAIの衝撃を超え、日本の尊厳を取り戻す者' 
              : 'The one who transcends the illusion of ¥100 billion and the shock of AI to reclaim Japan\'s dignity'}
          </motion.p>

          {/* 副題 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-rose-400/70 font-serif italic text-base max-w-lg mx-auto mb-16"
          >
            {lang === 'ja'
              ? 'ネオアウトローから文明ビルダーへ'
              : 'From Neo-Outlaw to Civilization Builder'}
          </motion.p>
          
          {/* スクロールインジケーター */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-col items-center gap-4 text-white/30"
          >
            <span className="text-xs font-serif italic tracking-wider">
              {lang === 'ja' ? 'スクロールして物語を読む' : 'Scroll to read the story'}
            </span>
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-amber-400/60 via-rose-400/40 to-transparent"
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scaleY: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 各章 */}
      {chapters.map((chapter, index) => (
        <Chapter
          key={chapter.id}
          chapter={chapter}
          lang={lang}
          index={index}
          isLast={index === chapters.length - 1}
        />
      ))}

      {/* フッター */}
      <footer className="py-32 text-center bg-gradient-to-t from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(251,191,36,0.1)_0%,_transparent_50%)]" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <p className="text-white/40 font-serif italic text-2xl mb-4">
            {lang === 'ja' ? '物語は、まだ始まったばかり。' : 'The story has only just begun.'}
          </p>
          <p className="text-amber-400/60 font-serif text-lg mb-8">
            — Ko Takahashi, 2025 —
          </p>
          <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full mx-auto animate-pulse" />
        </motion.div>
      </footer>
    </div>
  );
};

export default StoryView;