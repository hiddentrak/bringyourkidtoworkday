(function(){
    var game = new Phaser.Game(700, 700, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });
    var platforms;
    var init = false;
    var logo;
    var girl;
    var cursors;
    var groundY;
    var cases = [];
    var emitter;
    var spaceKey;

    function preload () {

        game.load.image('logo', 'images/businesskid.png');
        game.load.image('sky', 'images/sky.jpg');
        game.load.image('ground', 'images/ground.png');
        game.load.image('girl', 'images/ballerina.png');
        game.load.image('case', 'images/briefcase.png');
    }

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        if(!init) {
            addLogo();
        }
    }

    function addLogo() {
        logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.inputEnabled = true;
        logo.events.onInputDown.add(removeLogo, this);
    }

    function removeLogo() {
        logo.events.onInputDown.remove(removeLogo, this);
        logo.kill();
        setupGame();
    }

    function updateGirl() {
        if (cursors.up.isDown){
            girl.y -=5;
        }else if (cursors.down.isDown){
            girl.y +=5;
        }

        if (cursors.left.isDown){
            girl.x -= 5;
        }else if (cursors.right.isDown){
            girl.x += 5;
        }else {
            girl.body.velocity.set(0);
        };

        if (girl.y > groundY){
            girl.y=groundY;
        }else if (girl.y < (girl.height/2)){
            girl.y=girl.height/2;
        }

        if (girl.x > 700){
            girl.x = 0;
        }else if (girl.x < 0){
            girl.x = 700;
        }
    }

    function updateCases() {

        cases.forEach(function(bCase, index){
            bCase.x += bCase.vX;
            bCase.y += bCase.vY;

            if (bCase.x > 700 || bCase.x < 0){
                bCase.vX = -bCase.vX;
            }
            if (bCase.y > 700 || bCase.y < 0){
                bCase.vY = -bCase.vY;
            }

        });
    }

    function update () {
        if(init && girl && !isPaused()) {
            updateGirl();
            updateCases();
        }
    }

    function addCase(){
        var bCase = game.add.sprite(Math.random()*game.world.width, Math.random()*game.world.height, "case");
        var speed = Math.round(Math.random()*10);
        bCase.vX = speed;
        bCase.vY = speed;
        bCase.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(bCase);

        cases.push(bCase);
    }

    function addCases(amount){
        for(var i = 0; i<amount; i++){
            addCase();
        }
    }

    function isPaused() {
        return game.physics.arcade.isPaused;
    }

    function togglePause() {
        console.log("togglePause");
        game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
    }

    function setupGame() {
        groundY = game.world.height - 100;
        init = true;

        var sky = game.add.sprite(0, 0, 'sky');

        addCases(100);

        girl = game.add.sprite(50, groundY, "girl");
        girl.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(girl);


        platforms = game.add.group();
        platforms.enableBody = true;
        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 50, 'ground');
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        cursors = game.input.keyboard.createCursorKeys();

        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(togglePause, this);

    }
})();
