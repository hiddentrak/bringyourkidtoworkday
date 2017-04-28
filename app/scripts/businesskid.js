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
    var casePower = 0;
    var scoreText;
    var isGameOver = false;
    var caseCount = 100;

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
        }

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

    function endGame() {
        game.physics.arcade.isPaused = true;
        var showRestartLabel = function(){
            showLabel("CLICK ME PLAY AGAIN!", {noScale:true, speed:2000});
        }
        var winTween = game.add.tween(girl).to( { x: game.world.centerX }, 500, "Linear", true);
        game.add.tween(girl).to( { y: game.world.centerY }, 500, "Linear", true);
        var spin = game.add.tween(girl).to({angle:360}, 500, "Linear", true);
        spin.repeat(2, 0);

        spin.onComplete.add(showRestartLabel);
        girl.events.onInputDown.add(restartGame, this);

        showLabel("YOU WIN!!!!");

    }

    function updateCases() {

        cases.forEach(function(bCase, index){
            bCase.x += bCase.vX;
            bCase.y += bCase.vY;

            if(bCase.x > girl.x-girl.width/2
                && bCase.x < girl.x+girl.width/2
                && bCase.y > girl.y-girl.height/2
                && bCase.y < girl.y+girl.height/2) {
                    //collision
                    //remove case and delete from cases array;
                    cases.splice(index,1);
                    bCase.destroy();
                    casePower++;
                    scoreText.setText(casePower);
                    if(casePower === caseCount) {
                        endGame();
                    }
                    return;

                }

            if (bCase.x > 700 || bCase.x < 0){
                bCase.vX = -bCase.vX;
            }
            if (bCase.y > 700 || bCase.y < 0){
                bCase.vY = -bCase.vY;
            }

        });
    }

    function update () {
        if(init && girl && !isPaused() && !isGameOver) {
            updateGirl();
            updateCases();
        }
    }

    function addCase(){
        var bCase = game.add.sprite(Math.random()*game.world.width, Math.random()*game.world.height, "case");
        var speed = Math.round(Math.random()*10);
        speed = (speed < 1 ) ? 1 : speed;
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

    function showLabel(val, options) {
        options = (typeof options !== 'undefined') ? options : {};
        var style = options.style || { font: "32px Arial", fill: "#fff", align:"center"};
        var speed = options.speed || 500;
        var labelText;
        var fade;
        var scale;

        var killLabel = function() {
            labelText.destroy();
        }

        //  The Text is positioned at 0, 100
        labelText = game.add.text(game.world.centerX, game.world.centerY, val, style);
        labelText.anchor.setTo(0.5, 0.5);



        fade = game.add.tween(labelText).to( { alpha: 0 }, speed, "Linear", true);
        if(!options.noScale) {
            game.add.tween(labelText.scale).to({x:10, y:10}, speed, "Linear", true);
        }

        fade.onComplete.add(killLabel);
        fade.start();
    }

    function togglePause() {
        console.log("togglePause");
        game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
        var val = isPaused() ? "Paused" : "Play";
        showLabel(val);
    }

    function addScoreboard() {
        var style = { font: "24px Arial", fill: "#fff", align:"left"};
        var label = game.add.text(game.world.width-150, 20, "Score : ", style);
        scoreText = game.add.text((game.world.width-150 + label.width), 20, "0", style);
    }
    function restartGame() {
        casePower = 0;
        cases = [];
        game.physics.arcade.isPaused = false;
        girl.events.onInputDown.remove(restartGame, this);;
        addCases(caseCount);
    }
    function setupGame() {
        groundY = game.world.height - 100;
        init = true;

        var sky = game.add.sprite(0, 0, 'sky');

        addCases(caseCount);

        girl = game.add.sprite(50, groundY, "girl");
        girl.anchor.setTo(0.5, 0.5);
        girl.inputEnabled = true;
        girl.input.enableDrag(true);
        addScoreboard();

        platforms = game.add.group();
        platforms.enableBody = true;
        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 187, 'ground');

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        cursors = game.input.keyboard.createCursorKeys();

        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(togglePause, this);

    }
})();
