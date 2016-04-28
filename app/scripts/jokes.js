var joke = new Jokes();
    joke.laugh();

function Jokes(){

  var jokes = [
    {joke: 'Did you hear about the guy whose whole left side was cut off? He\'s all right now.', emoji : 'point-right'},
    {joke: "I'm reading a book about anti-gravity. It's impossible to put down.", emoji : 'blue-book'},
    {joke: "I wondered why the baseball was getting bigger. Then it hit me.", emoji : 'baseball'},
    {joke: "I'm glad I know sign language, it's pretty handy.", emoji : 'hand'},
    {joke: "My friend's bakery burned down last night. Now his business is toast.", emoji : 'fire'},
    {joke: "Why did the cookie cry? It was feeling crumby.", emoji : 'cookie'},
    {joke: "I used to be a banker, but I lost interest.",  emoji : 'moneybag'},
    {joke: "A drum and a symbol fall off a cliff", emoji : 'musical-note'},
    {joke: "Why do seagulls fly over the sea? Because they aren't bay-gulls!", emoji : 'ocean'},
    {joke: "Why did the fireman wear red, white, and blue suspenders? To hold his pants up.", emoji : 'fire-engine'},
    {joke: "Why didn't the crab share his food? Because crabs are territorial animals, that don't share anything.", emoji : 'rage'},
    {joke: "What do I look like? A JOKE MACHINE!?", emoji : 'black-joker'},
    {joke: "How did the hipster burn the roof of his mouth? He ate the pizza before it was cool.", emoji : 'pizza'},
    {joke: "Why is it hard to make puns for kleptomaniacs? They are always taking things literally.", emoji : 'gem'},
    {joke: "I'm a humorless, cold hearted, machine.", emoji : 'neutral-face'},
    {joke: "Two fish in a tank. One looks to the other and says 'Can you even drive this thing???'", emoji : 'fish'},
    {joke: "What's funnier than a monkey dancing with an elephant? Two monkeys dancing with an elephant.", emoji : 'monkey'},
    {joke: "How did Darth Vader know what Luke was getting for Christmas? He felt his presents.", emoji : 'gift'},
    {joke: "What's red and bad for your teeth? A Brick.", emoji : 'grimacing'},
    {joke: "What's orange and sounds like a parrot? A Carrot.", emoji : 'bird'},
    {joke: "What do you call a cow with no legs? Ground beef", emoji : 'cow2'},
    {joke: "Two guys walk into a bar. You'd think the second one would have noticed.", emoji : 'beers'},
    {joke: "What is a centipedes's favorite Beatle song?  I want to hold your hand, hand, hand, hand...", emoji : 'beetle'},
    {joke: "What do you call a chicken crossing the road? Poultry in moton. ", emoji : 'chicken'},
    {joke: "Did you hear about the Mexican train killer?  He had locomotives", emoji : 'steam-locomotive' },
    {joke: "What do you call a fake noodle?  An impasta", emoji : 'spaghetti'},
    {joke: "How many tickles does it take to tickle an octupus? Ten-tickles!", emoji : 'octopus'},
    {joke: "At the rate law schools are turning them out, by 2050 there will be more lawyers than humans.", emoji : 'briefcase'}
  ];



  this.laugh = function(){
    var index = Math.floor(Math.random() * jokes.length);
    var randomJoke = jokes[index];
    $('.joke').html(randomJoke.joke);
    $('.emoji').empty().html('<h1 class="twa twa-'+randomJoke.emoji+'"/>');
  };

  var _this = this;

  $('#joke-btn').click(function(){
    _this.laugh();
  })


}
