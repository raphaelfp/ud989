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

const helper = {
    getNewCatId: (() => {
        let counter = 0;
        return () => {return counter++;}
    })(),
};

const model = {
    currentCat: null,

    cats: new Array(
        new Cat('https://static.pexels.com/photos/60224/pexels-photo-60224.jpeg', 'Harold', helper.getNewCatId()),
        new Cat('https://static.pexels.com/photos/20787/pexels-photo.jpg', 'Mr. Potts', helper.getNewCatId()),
        new Cat('https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg', 'Kitty', helper.getNewCatId()),
        new Cat('https://upload.wikimedia.org/wikipedia/commons/2/28/Tortoiseshell_she-cat.JPG', 'Sheen', helper.getNewCatId()),
        new Cat('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Savannah_Cat_closeup.jpg/1280px-Savannah_Cat_closeup.jpg', 'Bob', helper.getNewCatId())
    )
};

const octopus = {
    init: function() {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },

    getCats: function() {
        return model.cats;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    incrementCounter: function() {
        model.currentCat.counter++;
        catView.render();
    }
};

const catView = {
    init: function() {
        this.$catName = $('#cat-name');
        this.$catClicker = $('#cat-clicker');
        this.$catCounter = $('#cat-counter');

        this.$catClicker.on('click', () => {
            octopus.incrementCounter();
        });

        this.render();
    },

    render: function() {
        let cat = octopus.getCurrentCat();
        this.$catName.html(cat.name);
        this.$catClicker.attr('src', cat.src);
        this.$catCounter.html(`You have clicked <span class="badge">${cat.counter}</span> times on ${cat.name}!!!`);
    }
};

const catListView = {
    init: function() {
        this.render();
    },

    render: function() {
        let cats = octopus.getCats();
        const $catList = $('#cat-list');

        $catList.empty();

        for(const cat of cats) {
            const $listElement = $('<li>').append($('<a>').html(cat.name).attr('href', '#'));
            $listElement.find('a').on('click', function() {
                octopus.setCurrentCat(cat);
                for(const child of $catList.find('.active')) {
                    console.log($(child).removeClass('active'));
                }
                $listElement.addClass('active');
                catView.render();
            });
            $catList.append($listElement);
            $catList.find(':first-child').addClass('active');
        }
    }
};

octopus.init();