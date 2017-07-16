require('../css/main.css');

class Cat {
    constructor(src, name, id, initialCounter = 0) {
        this.src = src;
        this.name = name;
        this.id = id;
        this.counter = initialCounter;
    }
    incrementCounter() {
        this.counter++;
    }
}

$( () => {
    const getNewCatId = (() => {
        let counter = 0;
        return () => {return counter++;}
    })();

    let $catList = $('#cat-list');
    let $displayArea = $('#display-area');

    let cats = new Set([
        new Cat('https://static.pexels.com/photos/60224/pexels-photo-60224.jpeg', 'Harold', getNewCatId()),
        new Cat('https://static.pexels.com/photos/20787/pexels-photo.jpg', 'Mr. Potts', getNewCatId()),
        new Cat('https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg', 'Kitty', getNewCatId()),
        new Cat('https://upload.wikimedia.org/wikipedia/commons/2/28/Tortoiseshell_she-cat.JPG', 'Sheen', getNewCatId()),
        new Cat('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Savannah_Cat_closeup.jpg/1280px-Savannah_Cat_closeup.jpg', 'Bob', getNewCatId())
    ]);

    for(let cat of cats) {
        $catList.append(`<li><a id="cat-${cat.id}" href="#">${cat.name}</a></li>`);
        $(`#cat-${cat.id}`).on('click', () => {
            $displayArea.empty();
            $displayArea.append(
                `<div class="col-xs-12 col-md-offset-3 col-md-6">
                    <h2>${cat.name}</h2>
                    <div>
                        <img class="img-responsive" id="cat-clicker${cat.id}" src="${cat.src}" alt="Say hi to ${cat.name}">
                    </div>
                    <p>
                        You just clicked ${cat.name} <span id="cat-clicker${cat.id}-counter">${cat.counter}</span> times
                    </p>
                </div>`
            );
            $(`#cat-clicker${cat.id}`).on('click', () => {
                cat.incrementCounter();
                $(`#cat-clicker${cat.id}-counter`).html(cat.counter);
            });
        });
    }

});
