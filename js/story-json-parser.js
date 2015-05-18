
$(document).ready(function() {
	var story_path = $('body').data('story');
	if (story_path) {
		// data-storyが設定されていればjsonを読み込む
		$.getJSON(story_path, function(data) {
			parsePageJson(data);
			parseStoryJson(data);
			parseAfterwordJson(data);
			parseFooterJson(data);

			// jsonセット完了
			setWaypoint();
			$('#loader-bg').fadeOut(500);
		});
	}
});

/*
 * ページの構成
 * 　・ヘッダーメニューの構成
 */
function parsePageJson(data) {
	if (data.topMenu) {
		for (var i in data.topMenu) {
			$('#top-nav').append(
				$('<li/>').append(
					$('<a/>').attr('href', data.topMenu[i].link).append(
						data.topMenu[i].title + "<span class='indicator'><i class='fa fa-angle-right'></i></span>")));
		}
	}
}

/*
 * 後書きの設定
 */
function parseAfterwordJson(data) {
	if (data.afterword) {
		$('#afterword img.profile-image').attr('src', data.afterword.profileImage);
		$('#afterword h1.name').text(data.afterword.name);
		$('#afterword p.text').html(data.afterword.text);
		if (data.afterword.socials){
			for (var i in data.afterword.socials) {
				$('#afterword ul.social-buttons').append(
					$('<li/>').append($('<a/>').attr('href', data.afterword.socials[i].url).addClass('social-btn').append(
						$('<i/>').addClass('fa').addClass(data.afterword.socials[i].faIcon))));
			}
		}
		if (data.afterword.storyLink) {
			if (data.afterword.storyLink.prevUrl) {
				$('#story-link a.story-link.prev').addClass('active').attr('href', data.afterword.storyLink.prevUrl);
			}
			if (data.afterword.storyLink.nextUrl) {
				$('#story-link a.story-link.next').addClass('active').attr('href', data.afterword.storyLink.nextUrl);
			}
		}
	}
}

/*
 * フッターの設定
 */
function parseFooterJson(data) {
	if (data.footer) {
		$('#page-footer p.credit').html(data.footer.credit);
		if (data.footer.links) {
			for (var i in data.footer.links) {
				$('#page-footer ul.legals').append(
					$('<li/>').append($('<a/>').attr('href', data.footer.links[i].url).text(data.footer.links[i].name)));
			}
		}
	}
}

/*
 * タイトルの設定
 */
function parseStoryJson(data) {
	if (data.story) {
		if (data.story.title) {
			$('#page-title').text(data.story.title);
		}
		if (data.story.subTitle) {
			$('#page-sub-title').text(data.story.subTitle);
		}
		if (data.story.titleBgImage) {
			$('#page-header').css('background-image', "url('" + data.story.titleBgImage + "')");
		}
		if (data.story.sections) {
			parseSectionsJson(data.story.sections, data);
		}
	}
}

/*
 * テキストを挿入するsectionを設定する
 */
function parseSectionsJson(sections, data) {
	for (var i in sections) {
		// テキストをappendしていく末尾のdiv要素の作成
		var textsAppendElement = $('<div/>').addClass('col-md-8').addClass('col-md-offset-2');
		// section要素の作成
		var sectionElement = $('<section/>').addClass('story').append(
			$('<div/>').addClass('container').append(
				$('<div/>').addClass('row').append(
					textsAppendElement)));
		// section要素をドキュメントに挿入
		$('#story-main').append(sectionElement);

		// section要素のクラスと背景を設定（オプション）
		if (sections[i].type) {
			sectionElement.addClass(sections[i].type);
		}
		if (sections[i].bgImage) {
			sectionElement.css('background-image', "url('" + sections[i].bgImage + "')");
		}

		// テキストの挿入
		if (sections[i].texts) {
			// テキストの解析
			parseSectionTextsJson(sections[i].texts, textsAppendElement, data);
		}
	}
}

/*
 * テキストを挿入する
 */
function parseSectionTextsJson(texts, appendElement, data) {
	for (var i in texts) {
		if (texts[i].name) {
			parseSectionTalkJson(texts[i], appendElement, data);
		} else {
			parseSectionTextJson(texts[i], appendElement, data);
		}
	}
}

function parseSectionTextJson(textData, appendElement, data) {
	appendElement.append(
		$('<div/>').addClass('row').addClass('wp-text').addClass('wp-down').append(
			$('<div/>').addClass('col-md-12').append(
				$('<p/>').html(textData.text))));
}

function parseSectionTalkJson(textData, appendElement, data) {
	// 表示用パラメータ
	var direction;
	var color;
	var image;
	// キャラクターが宣言されているかチェック
	if (data.story.characters) {
		if (data.story.characters[textData.name]) {
			direction = data.story.characters[textData.name].direction;
			color = data.story.characters[textData.name].color;
			image = data.story.characters[textData.name].img;
		}
	}
	// もし個別設定があれば上書きする
	if (textData.direction) { direction = textData.direction; }
	if (textData.color) { color = textData.color; }
	if (textData.img) { image = textData.img; }

	// ベースとなるdiv要素の生成
	var baseElement = $('<div/>').addClass('row').addClass('wp-talk');
	if (direction) {
		baseElement.addClass('wp-' + direction);
	} else {
		baseElement.addClass('wp-left');
	}
	if (color) {
		baseElement.addClass('wp-color-' + color);
	}

	// img要素の生成
	var imgElement = $('<img/>').attr('src', image).addClass('circle');

	// 名前の生成
	var nameElement = $('<p/>').addClass('name').text(textData.name);

	// 吹き出しの生成
	var balloonElement = $('<p/>').addClass('balloon').html(textData.text);

	// ドキュメントに追加
	appendElement.append(
		baseElement.append(
			$('<div/>').addClass('col-xs-2').append(imgElement)
		).append(
			$('<div/>').addClass('col-xs-10').append(nameElement).append(balloonElement)
		)
	);
}




