# Sofya: a Theme for Hugo

A minimalist theme for Hugo (static site generator).

See a [working example here](https://jonathondilworth.github.io/sofya-example/).

## Motivation

I was unable to find a theme that incompassed all of the design elements that I wanted for my blog, so I created my own. I was, however, inspired by the following designs:

* http://hbpasti.github.io/heather-hugo/
* http://motherfuckingwebsite.com/
* http://bettermotherfuckingwebsite.com/
* http://lessmade.com/themes/less/
* http://www.goldsborough.me/

Some of the base styles have been lifted from: http://hbpasti.github.io/heather-hugo/

## Installation

To get started with this theme, create a new hugo site:

```
hugo new site helloworld
```

Navigate to the themes directory:

```
cd helloworld/themes
```

Clone in (or download & extract) the theme:

```
git clone https://github.com/jonathondilworth/sofya.git
```

Update the theme parameter within the site's config.toml:

```
theme = "sofya"
```

Here is an example config.toml file:

```
title = "My Blog"
languageCode = "en-us"
theme = "sofya"
baseURL = "https://jonathondilworth.github.io/sofya-example/"

[author]
  name = "Jonathon Dilworth"
  homepage = "http://jonathondilworth.github.io/sofya-example/"

[params]
  desc = "Example Desc"
  displaymenu = true
  twitter = "https://twitter.com/"
  github = "https://github.com/"
  quora = "https://www.quora.com/"
  linkedin = "https://linkedin.com/"
  stackoverflow = "http://stackoverflow.com/"

[[menu.main]]
    name = "home"
    pre = ""
    weight = -110
    identifier = "home"
    url = "/"

[[menu.main]]
    name = "about"
    pre = ""
    weight = -100
    identifier = "about"
    url = "/about/"
```

## Notes

You can achieve syntax highlighting through using [pygments](http://pygments.org/), as explained [here](https://gohugo.io/extras/highlighting/).

## Feature Roadmap:
* ~~Social Media Links.~~
* ~~Responsive site / media queries.~~
* ~~Dynamic pages to populate nav bar.~~
* Taxonomies / tags.
* MathJax.
* Comments for posts (disqus).
* Gravatar integration on about page.

## License

MIT License http://opensource.org/licenses/MIT