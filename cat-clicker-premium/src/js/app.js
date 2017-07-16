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
    isAdminAreaOpened: false,
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
        adminView.init();
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
    },

    isAdminAreaOpened: function() {
        return model.isAdminAreaOpened;
    },

    openAdminArea: function() {
        model.isAdminAreaOpened = true;
    },

    closeAdminArea: function() {
        model.isAdminAreaOpened = false;
    },

    saveCat: function(cat) {
        model.currentCat = cat;
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

    render: function(renderButton = true) {
        this.cats = octopus.getCats();
        this.currentCat = octopus.getCurrentCat();
        this.$catList = $('#cat-list');
        this.$catList.empty();

        for(const cat of this.cats) {
            const $listElement = $('<li>').append($('<a>').html(cat.name).attr('href', '#'));
            $listElement.attr('id', `cat-${cat.id}`);
            $listElement.find('a').on('click', () => {
                octopus.setCurrentCat(cat);
                for(const child of this.$catList.find('.active')) {
                    console.log($(child).removeClass('active'));
                }
                $listElement.addClass('active');
                catView.render();
                adminView.render();
            });
            this.$catList.append($listElement);
            if(renderButton)
                this.$catList.find(':first-child').addClass('active');
        }
        if(!renderButton)
            $(`#cat-${this.currentCat.id}`).addClass('active');

    }
};

const adminView = {
    init: function() {
        this.$adminArea = $('#admin-area');
        this.$adminButton = $('#admin-button');
        this.$adminButtonGroup = $('#admin-button-group');
        this.$adminCancel = $('#admin-cancel');
        this.$adminSave = $('#admin-save');
        this.$adminForm = $('#admin-form');
        this.$adminName = $('#admin-name');
        this.$adminSrc = $('#admin-src');
        this.$adminCounter = $('#admin-counter');
        
        this.$adminButton.on('click', () => {
            octopus.openAdminArea();
            adminView.render();
        });
        this.$adminCancel.on('click', () => {
            octopus.closeAdminArea();
            adminView.render();
        });
        this.$adminSave.on('click', () => {
            let cat = octopus.getCurrentCat();
            cat.name = this.$adminName.val();
            cat.src = this.$adminSrc.val();
            cat.counter = Number(this.$adminCounter.val());
            octopus.saveCat(cat);
            octopus.closeAdminArea();
            adminView.render();
            catListView.render(false);
            catView.render();
        });

        this.render();
    },

    render: function() {
        let cat = octopus.getCurrentCat();
        this.$adminName.val(cat.name);
        this.$adminSrc.val(cat.src);
        this.$adminCounter.val(`${cat.counter}`);

        this.$adminButton.css('display', octopus.isAdminAreaOpened() ? 'none' : 'inherit');
        this.$adminButtonGroup.css('display', octopus.isAdminAreaOpened() ? 'inherit' : 'none');
        this.$adminArea.css('display', octopus.isAdminAreaOpened() ? 'inherit' : 'none');
    }
}

octopus.init();