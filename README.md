# story

キャラクターの対話型の小説サイトを簡単に作るテンプレートです。

# サンプル

http://omokichi.sakura.ne.jp/sample/story2/

# 書き方

1. HTMLファイルの`<title>タイトル</title>`を書き換えます。
1. HTMLファイルのBODY要素の"data-story"にjsonファイルを指定します。
1. 指定したjsonファイルを書き換えます。

## jsonファイル

jsonファイルは大きく分けて下記の４つの要素から成り立っています。

* トップメニューを構成する`topMenu`
* 物語を構成する`story`
* あとがきを構成する`afterword`
* フッターを構成する`footer`

### トップメニューを構成する`topMenu`について

トップメニューはページ上部に隠れているリスト型メニューです。

```story1.json
  "topMenu": [
    {
      "title": "作品について",
      "link": "#"
    },
    {
      "title": "前のお話し",
      "link": "http://omokichi.sakura.ne.jp/sample/story/"
    }
  ]
```

`title`と`link`で構成される配列で定義します。
`title`にはリンクに表示される文字列、`link`はURLを記述します。

### 物語を構成する`story`

ページの上部タイトルから後書き手前までの物語に関する記載を`story`で行います。
`story`は大きく分けて下記の３つで構成されています。

* `story`直下にある`title`、`subTitle`、`titleBgImage`
* 登場人物を事前に定義する`characters`
* 物語を書いていく`sections`

#### `story`直下にある`title`、`subTitle`、`titleBgImage`

ページ上部タイトルを構成します。
`title`はタイトルを、`subTitle`はサブタイトル、`titleBgImage`にタイトル背景画像を指定します。


```story1.json
  "story": {
    "title": "小説サイトテンプレート",
    "subTitle": "jsonファイルでお手軽小説ページ作成の巻",
    "titleBgImage": "./img/title-bg.jpg",
```

なお、タイトル背景画像は自動で白っぽく表示されます。


#### 登場人物を事前に定義する`characters`

登場人物を事前に定義する事で物語を必要最低限で記載できて便利です。

```story1.json
    "characters": {
      "アリス": {
        "direction": "left",
        "color": "pink",
        "img": "img/chara1.png"
      },
      "マルコ": {
        "direction": "right",
        "color": "orange",
        "img": "img/chara2-2.png"
      }
    }
```

`characters`のキーとなる名前は後述する`texts`で指定する名前です。

* `direction`はキャラが左側か右側かを`left`と`right`で指定します。（指定しない場合は`left`）
* `color`はキャラ画像の背景色を指定します。現状、`pink`と`orange`しか用意してません。他の色が必要であれば`styles.css`に定義を追加してください。

```styles.css
/* 色設定 */
.wp-talk.wp-color-pink img {
	background-color: pink;
}
.wp-talk.wp-color-orange img {
	background-color: orange;
}
```

* `img`はキャラ画像を指定します。会話中に表情を変える場合は後述する`texts`で画像を再指定できます。ここではよく使うキャラ画像を指定しましょう。

#### 物語を書いていく`sections`

`sections`は物語を書いていく際の背景を指定します。
通常は白背景でいいと思いますが、強調した表現をしたい際に背景画像を指定できます。

```story1.json
    "sections": [
      {
        "type": "bg-dark",
        "bgImage": "img/sora-bg.jpg",
        "texts": [
          ...
        ]
      }
    ]
```

`type`には`bg-white`か`bg-dark`を指定します。
`bg-white`は白背景の際に文字が灰色にでき、`bg-dark`は黒背景の際に文字が白色にできます。背景画像に合わせて変更してください。
`bgImage`には背景画像を指定します。

`texts`にはその背景中の文章や会話を記載していきます。

```
        "texts": [
          {
            "name": "アリス",
            "text": "今日も良い天気。借りてた本を図書館に返しにいかないと。"
          },
          {
            "text": "マルコとの出会いから数週間が過ぎたある日、アリスは借りていた本の返却のために再び図書館を訪れる事にした。"
          }
        ]
```

`name`を指定する事で登場人物の吹き出しになります。`characters`で指定した名前をしていしましょう。
`text`は文章や会話の文章を記載します。HTMLタグが使えます。
また、登場人物の向きや画像を書き換えた場合は`characters`で指定した要素を再び指定する事で、一時的に上書きができます。


### あとがきを構成する`afterword`

後書きは下記の３点で構成されています。

* 前の話、次の話のリンク
* 後書き
* ソーシャルボタン


#### 前の話、次の話のリンク

前の話、次の話が存在する場合にリンクを有効にすることができます。
`prevUrl`に前の話のURLを、`nextUrl`に次の話のURLを記入します。
指定をしなければリンクは無効状態のままです。

```
  "afterword": {
    "storyLink": {
      "prevUrl": "http://omokichi.sakura.ne.jp/sample/story/",
      "nextUrl": ""
    }
```

#### 後書き

後書きはプロフィールアイコン（`profileImage`）、名前（`name`）、文章（`text`）の３つで構成されます。

```
  "afterword": {
    "name": "namityo",
    "profileImage": "img/profile.png",
    "text": "...",
```

`text`はHTMLタグが利用可能です。


#### ソーシャルボタン

作者のtwitterやfacebook、mail、ホームページのリンクを載せるのに利用します。
`url`には各ソーシャルのURLを、faIconには[fontawesome](http://fortawesome.github.io/Font-Awesome/)のクラス名を指定します。

```
  "afterword": {
    "socials": [
      {
        "url": "https://twitter.com/namityo",
        "faIcon": "fa-twitter"
      },
      {
        "url": "http://omokichi.sakura.ne.jp/blog/",
        "faIcon": "fa-home"
      }
    ]
```

### フッターを構成する`footer`

ページのフッターを構成します。
リンクと製作者のコピーライトを記載します。

```
  "footer": {
    "links": [
      {
        "name": "思い立ったが吉日",
        "url": "http://omokichi.sakura.ne.jp/blog/"
      },
      {
        "name": "Halcyon Days",
        "url": "http://tympanus.net/codrops/2014/07/14/freebie-halcyon-days-one-page-website-template/"
      },
      {
        "name": "ジュエルセイバーFREE",
        "url": "http://www.jewel-s.jp/"
      }
    ],
    "credit": "製作 namityo"
  }
```

`links`は左下のリンクを構成します。
`name`にリンク文字、`url`にリンクURLを記載します。

`credit`はコピーライト等を記載します。HTMLタグが使用できます。


# ライセンス等

ページの基本構成は[HALCYON DAYS](http://tympanus.net/codrops/2014/07/14/freebie-halcyon-days-one-page-website-template/)を使用しています。

サンプルの画像には[ジュエルセイバーFREE](http://www.jewel-s.jp/)を使用しています。


本ソースの改変配布に制限を設けませんが、上記のライセンス条文をご理解頂いた上でご使用下さい。
