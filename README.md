## Goonstation SS13 [Telescience Map][github pages]

This is a map designed for doing telescience on SS13, specifically on the Goonstation servers.

### What is SS13?

Space Station 13 is a unique multiplayer game, built by its own community for 10+ years. Over time, it has managed to attract thousands of players, and offer an experience no other game can.

A typical space station round will start with the promise of a good time, and end in hilarious chaos, all before being reset to try again.

### How can I play?

1. [Install Byond](#extra-info)
2. Select your [favorite](#extra-info) Space Station 13 server
3. Ask questions in game -- it is notiriously complicated to learn, due simply to the fact that over the years tons of content has been generated. People will usually be glad to help you.

### Where does this map come in?

This is an out of game helper app for one specific aspect of the game. Scientist players have access to a "Telescience" machine, which if calibrated correctly, can send or receive any item, player, bomb, beaker of acid, or hideous alien anywhere they choose.

Every round, a new set of X and Y modifiers and divisors are added to obfuscate the "true coordinates" for the game grid in the telescience computer. A set of algebraic equations can be used to solve these, which my website will handily do for you.

Simply send one GPS through to any set of working coordinates, record where it actually went in the relevant table, then send another GPS to a set of coordinates exactly n+1. I.E, send one at 50X, 100Y, then another at 51X, 101Y.

### Extra Info

1. [BYOND game platform][byond]
2. [SS13 Wiki][ss13 wiki]
3. [Telescience Information][telescience info]
4. [Server Links][goonhub]

### How does this site work?

A relatively complicated state controls the scale and offset numbers, which are applied to the translate CSS for the container of all of the images depending on what the user does - scroll, zoom, re-center, et cetera.

This is an example of some of the math needed.

```javascript
// This is used to place each tile selector over the image container just as if it had the 300/300 grid the game does.
function tileMath(x, y) {
    return [1 + (x - (x % 32)) / 32, 300 - (y - (y % 32)) / 32];
}

// This is used to position each tile selector correctly, this is the CSS value applied to its absolute position.
function tilePosition(x, y) {
    if (!y && typeof x === 'object') [x, y] = x;
    return {
        left: (x - 1) * 32 * scale + tf.pos[0],
        top: -(y - 300) * 32 * scale + tf.pos[1],
    };
}

// This is used to find the absolute pixel value of where a user clicked. The positioning of the image needs to be
// subtracted from the X and Y value of a users click, and the scale needs to be removed to find this value.
function imgCoords(x, y, funcScale = scale, pos = tf.pos) {
    return [x - pos[0], y - pos[1]].map(i => i / funcScale);
}
```

### Credits

-   [Travis-CI][travis] for their excellent continuous deployment services.

-   [Material UI][material-ui] for their set of higher level react components and pretty CSS like the dark theme, typography, etc.

-   [Goonhub.com][goonhub] for supplying the pngs for these maps.

---

## Author

-   **Jesse Webb** => _All JS, html, Custom CSS_ => [Kayle7777][github link]

### Code Links

-   **Code repository** => hosted on [Github][github repo]

-   **Live webpage** => hosted on [Github Pages][github pages]

[travis]: https://travis-ci.org/
[goonhub]: https://goonhub.com/
[material-ui]: https://material-ui.com/
[byond]: http://www.byond.com/
[telescience info]: https://wiki.ss13.co/Telescience
[ss13 wiki]: https://wiki.ss13.co/Main_Page
[github link]: https://github.com/kayle7777
[github repo]: https://github.com/Kayle7777/telescience
[github pages]: https://kayle7777.github.io/telescience/
