angular.module('bee', [
    'ngAnimate',
    'ngSanitize',
		'ui.router',
		'templates'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('app', {
        url: '/',
        templateUrl: 'app.html',
        controller: 'AppCtrl'
    })
    .state('words', {
        url: '/words',
        templateUrl: 'words.html',
        controller: 'WordsCtrl'
    });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}])
.controller('AppCtrl', ['$scope', '$window',
  function ($scope, $window) {
    var w = angular.element($window);
    $scope.getWindowSize = function() {
      return { 'h': w.height(), 'w': w.width() };
    };

    $scope.$watch($scope.getWindowSize, function(newValue) {
      $scope.windowHeight = newValue.h;
      $scope.windowWidth = newValue.w;
    }, true);

    w.bind('resize', function() { $scope.$apply(); });
  }
])
.controller('WordsCtrl', ['$scope', '$sce', 'focus', '$window', '$timeout', 'xscroll', '$state',
  function ($scope, $sce, focus, $window, $timeout, xscroll, $state) {
    var AUDIO_URL = 'http://static.sfdict.com/staticrep/dictaudio/';
    var wordAudio = function(word, audio, pg, definition) {
      return {
        text: word,
        audio: $sce.trustAsResourceUrl(AUDIO_URL+audio),
        pg: pg,
        definition: definition
      };
    };

    $scope.updated = function(idx) {
      if($scope.checks[idx] == false) {
        $scope.checks[idx] = undefined;
      }
    }

    var w = angular.element($window);
    $scope.getWindowSize = function() {
      return { 'h': w.height(), 'w': w.width() };
    };
    $scope.$watch($scope.getWindowSize, function(newValue) {
      $scope.windowHeight = newValue.h;
      $scope.windowWidth = newValue.w;
    }, true);

    w.bind('resize', function() { $scope.$apply(); });

    function randomWords(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };

    $scope.simon = function(mode, idx) {
      $scope.bee.mode = mode;
      $scope.bee.wordIdx = idx || 0;
      if(mode === 'practice') {
        $scope.words = $scope.bee.rounds[$scope.bee.round];
        $scope.values[idx] = '';
        focus('spelling'+ $scope.bee.wordIdx);
        setTimeout(function(){
          angular.element(document.getElementById('audio-player'+ $scope.bee.wordIdx).play());
        }, 1000);
      } else if (mode === 'study'){
        $scope.words = $scope.bee.rounds[$scope.bee.round];
        $scope.bee.practicing = idx;
        xscroll('xword'+idx);
      } else if (mode === 'test'){
        $scope.testWords = randomWords($scope.words, 10);
        focus('spelling0');
        setTimeout(function(){
          angular.element(document.getElementById('audio-player0').play());
        }, 1000);
      }
    }

    var round1 = [
      wordAudio('reward', 'R02/R0271400.mp3', 'noun', "a sum of money offered for the detection or capture of a criminal, the recovery of lost or stolen property, etc."),
      wordAudio('caramel', 'C01/C0127400.mp3', 'noun', "a liquid made by cooking sugar until it changes color, used for coloring and flavoring food."),
      wordAudio('trademark', 'T04/T0421600.mp3', 'noun', "any name, symbol, figure, letter, word, or mark adopted and used by a manufacturer or merchant in order to designate his or her goods and to distinguish them from those manufactured or sold by others. A trademark is a proprietary term that is usually registered with the Patent and Trademark Office to assure its exclusive use by its owner."),
      wordAudio('husband', 'H04/H0448400.mp3', 'noun', "a married man, especially when considered in relation to his partner in marriage."),
      wordAudio('hallway', 'H00/H0042500.mp3', 'noun', "a corridor, as in a building."),
      wordAudio('brunch', 'B06/B0653000.mp3', 'noun', "a meal that serves as both breakfast and lunch."),
      wordAudio('splashy', 'S08/S0822600.mp3', 'adjective', "making a splash or splashes."),
      wordAudio('ping-pong', 'P04/P0465900.mp3', 'verb (used with object)', "to move back and forth or transfer rapidly from one locale, job, etc., to another; switch: The patient was ping-ponged from one medical specialist to another."),
      wordAudio('obscure', 'O00/O0016300.mp3', 'adjective', "(of meaning) not clear or plain; ambiguous, vague, or uncertain: an obscure sentence in the contract."),
      wordAudio('length', 'L01/L0177000.mp3', 'noun', "the longest extent of anything as measured from end to end: the length of a river."),
      wordAudio('canopy', 'C00/C0098700.mp3', 'noun', "a covering, usually of fabric, supported on poles or suspended above a bed, throne, exalted personage, or sacred object."),
      wordAudio('surefire', 'S11/S1152800.mp3', 'adjective', "sure to work; foolproof: a surefire moneymaking scheme."),
      wordAudio('passport', 'P01/P0153400.mp3', 'noun', "an official document issued by the government of a country to one of its citizens and, varying from country to country, authorizing travel to foreign countries and authenticating the bearer's identity, citizenship, right to protection while abroad, and right to reenter his or her native country."),
      wordAudio('habit', 'H00/H0002900.mp3', 'noun', "an acquired behavior pattern regularly followed until it has become almost involuntary: the habit of looking both ways before crossing the street."),
      wordAudio('quack', 'Q00/Q0005000.mp3', 'noun', "the harsh, throaty cry of a duck or any similar sound."),
      wordAudio('connect', 'C07/C0762100.mp3', 'verb (used with object)', "to join, link, or fasten together; unite or bind: to connect the two cities by a bridge; Communication satellites connect the local stations into a network."),
      wordAudio('nurture', 'N02/N0268400.mp3', 'verb (used with object)', "to feed and protect: to nurture one's offspring."),
      wordAudio('vicinity', 'V01/V0113900.mp3', 'noun', "the area or region near or about a place; surrounding district; neighborhood: There are no stores in the vicinity of our house."),
      wordAudio('wharf', 'NEW/NEW15995.mp3', 'noun', "a structure built on the shore of or projecting into a harbor, stream, etc., so that vessels may be moored alongside to load or unload or to lie at rest; quay; pier."),
      wordAudio('eerie', 'E00/E0052200.mp3', 'adjective', "uncanny, so as to inspire superstitious fear; weird: an eerie midnight howl."),
      wordAudio('mineral', 'M04/M0453800.mp3', 'noun', "any of a class of substances occurring in nature, usually comprising inorganic substances, as quartz or feldspar, of definite chemical composition and usually of definite crystal structure, but sometimes also including rocks formed by these substances as well as certain natural products of organic origin, as asphalt or coal."),
      wordAudio('aloha', 'A03/A0344200.mp3', 'noun, interjection', "hello; greetings."),
      wordAudio('coffee', 'C06/C0620300.mp3', 'noun', "a beverage consisting of a decoction or infusion of the roasted ground or crushed seeds (coffee beans) of the two-seeded fruit (coffee berry) of certain coffee trees."),
      wordAudio('mustang', 'M07/M0708700.mp3', 'noun', "a small, hardy horse of the American plains, descended from Spanish stock."),
      wordAudio('parade', 'P00/P0089700.mp3', 'noun', "a large public procession, usually including a marching band and often of a festive nature, held in honor of an anniversary, person, event, etc.")
    ];
    var round2 = [
      wordAudio('lavender', 'L01/L0118500.mp3', 'noun', "a pale bluish purple."),
      wordAudio('gauze', 'G00/G0076400.mp3', 'noun', "any thin and often transparent fabric made from any fiber in a plain or leno weave."),
      wordAudio('mirthful', 'M04/M0474900.mp3', 'adjective', "joyous; gay; jolly: a mirthful laugh."),
      wordAudio('beret', 'B02/B0259300.mp3', 'noun', "a soft, visorless cap with a close-fitting headband and a wide, round top often with a tab at its center."),
      wordAudio('evaporation', 'E03/E0359500.mp3', 'noun', "the act or process of evaporating."),
      wordAudio('vigorous', 'V01/V0127500.mp3', 'adjective', "full of or characterized by vigor: a vigorous effort."),
      wordAudio('boycott', 'B05/B0558000.mp3', 'verb (used with object)', "to combine in abstaining from, or preventing dealings with, as a means of intimidation or coercion: to boycott a store."),
      wordAudio('impulse', 'I00/I0089500.mp3', 'noun', "the influence of a particular feeling, mental state, etc.: to act under a generous impulse; to strike out at someone from an angry impulse."),
      wordAudio('winsome', 'W01/W0194200.mp3', 'adjective', "sweetly or innocently charming; winning; engaging: a winsome smile."),
      wordAudio('alternate', 'A03/A0354400.mp3', 'verb (used without object)', "to interchange repeatedly and regularly with one another in time or place; rotate (usually followed by with): Day alternates with night."),
      wordAudio('ottoman', 'O02/O0206600.mp3', 'adjective', "of or relating to the Ottoman Empire."),
      wordAudio('entertain', 'E02/E0212000.mp3', 'verb (used with object)', "to hold the attention of pleasantly or agreeably; divert; amuse."),
      wordAudio('anorak', 'A05/A0510400.mp3', 'noun', "a hooded pullover jacket originally made of fur and worn in the arctic, now made of any weather-resistant fabric."),
      wordAudio('documentary', 'D04/D0428200.mp3', 'adjective', "Also, documental documents: a documentary history of France."),
      wordAudio('jargon', 'J00/J0028600.mp3', 'noun', "the language, especially the vocabulary, peculiar to a particular trade, profession, or group: medical jargon."),
      wordAudio('kiwi', 'K01/K0134100.mp3', 'noun', "any of several flightless, ratite birds of the genus Apteryx, of New Zealand, allied to the extinct moas."),
      wordAudio('eyebrow', 'E04/E0443100.mp3', 'noun', "the arch or ridge forming the upper part of the orbit of the eye."),
      wordAudio('velcro', 'V00/V0061100.mp3', 'noun', "a brand of fastening tape consisting of opposing pieces of fabric, one with a dense arrangement of tiny nylon hooks and the other with a dense nylon pile, that interlock when pressed together, used as a closure on garments, luggage, etc., in place of buttons, zippers, and the like."),
      wordAudio('random', 'R00/R0056000.mp3', 'adjective', "proceeding, made, or occurring without definite aim, reason, or pattern: the random selection of numbers."),
      wordAudio('summary', 'S11/S1106500.mp3', 'noun', "a comprehensive and usually brief abstract, recapitulation, or compendium of previously stated facts or statements."),
      wordAudio('macaw', 'M00/M0004300.mp3', 'noun', "any of various large, long-tailed parrots, chiefly of the genus Ara, of tropical and subtropical America, noted for their brilliant plumage and harsh voice."),
      wordAudio('variety', 'V00/V0038500.mp3', 'noun', "the state of being varied or diversified: to give variety to a diet."),
      wordAudio('moxie', 'M06/M0650800.mp3', 'noun', "force of character, determination, or nerve: when you've got moxie, you need the clothes to match"),
      wordAudio('jersey', 'J00/J0051000.mp3', 'noun', 'a close-fitting, knitted sweater or shirt.'),
      wordAudio('people', 'P02/P0250900.mp3', 'noun', 'persons indefinitely or collectively')
    ];
    var round3 = [
      wordAudio('cough', 'C08/C0898800.mp3', 'verb (used without object)', 'to expel air from the lungs suddenly with a harsh noise, often involuntarily.'),
      wordAudio('marlin', 'M01/M0163500.mp3', 'noun', 'any large, saltwater game fish of the genera Makaira and Tetrapterus, having the upper jaw elongated into a spearlike structure.'),
      wordAudio('warning', 'W00/W0041700.mp3', 'noun', 'the act or utterance of one who warns or the existence, appearance, sound, etc., of a thing that warns.'),
      wordAudio('sonar', 'S07/S0718900.mp3', 'noun', 'a method for detecting and locating objects submerged in water by echolocation.'),
      wordAudio('forum', 'F03/F0316200.mp3', 'noun', 'the marketplace or public square of an ancient Roman city, the center of judicial and business affairs and a place of assembly for the people.'),
      wordAudio('silent', 'S05/S0523800.mp3', 'adjective', 'making no sound; quiet; still: a silent motor.'),
      wordAudio('domino', 'D04/D0453100.mp3', 'noun', 'a flat, thumbsized, rectangular block, the face of which is divided into two parts, each either blank or bearing from one to six pips or dots: 28 such pieces form a complete set.'),
      wordAudio('glance', 'G01/G0177500.mp3', 'verb (used without object)', 'to look quickly or briefly.'),
      wordAudio('atomic', 'A07/A0785700.mp3', 'adjective', 'of, pertaining to, resulting from, or using atoms, atomic energy, or atomic bombs: an atomic explosion.'),
      wordAudio('native', 'N00/N0038500.mp3', 'adjective', "being the place or environment in which a person was born or a thing came into being: one's native land."),
      wordAudio('clutch', 'C05/C0582400.mp3', 'verb (used with object)', 'to seize with or as with the hands or claws; snatch: The bird swooped down and clutched its prey with its claws.'),
      wordAudio('polar', 'P05/P0586100.mp3', 'adjective', 'of or relating to the North or South Pole.'),
      wordAudio('field', 'F01/F0126400.mp3', 'noun', 'an expanse of open or cleared ground, especially a piece of land suitable or used for pasture or tillage.'),
      wordAudio('ocean', 'O00/O0026100.mp3', 'noun', "the vast body of salt water that covers almost three fourths of the earth's surface."),
      wordAudio('acre', 'A00/A0095400.mp3', 'noun', 'a common measure of area: in the U.S. and U.K., 1 acre equals 4,840 square yards (4,047 square meters) or 0.405 hectare; 640 acres equals one square mile.'),
      wordAudio('gratis', 'G03/G0314700.mp3', 'adverb', "without charge or payment; free: The manufacturer provided an extra set of coat buttons gratis."),
      wordAudio('sympathy', 'S12/S1207500.mp3', 'noun', "harmony of or agreement in feeling, as between persons or on the part of one person with respect to another."),
      wordAudio('paragon', 'P00/P0093300.mp3', 'noun', "a model or pattern of excellence or of a particular excellence: a paragon of virtue."),
      wordAudio('festooned', 'F01/F0106900.mp3', 'noun', "a string or chain of flowers, foliage, ribbon, etc., suspended in a curve between two points."),
      wordAudio('tonsils', 'T03/T0364300.mp3', 'noun', "a prominent oval mass of lymphoid tissue on each side of the throat."),
      wordAudio('mogul', 'M05/M0526700.mp3', 'noun', "a bump or mound of hard snow on a ski slope."),
      wordAudio('frequently', 'F03/F0368500.mp3', 'adverb', "often; many times; at short intervals."),
      wordAudio('pomposity', 'P06/P0629800.mp3', 'noun', "the quality of being pompous."),
      wordAudio('marathon', 'M01/M0135400.mp3', 'noun', "a foot race over a course measuring 26 mi. 385 yards (42 km 195 meters)."),
      wordAudio('polemic', 'P05/P0588800.mp3', 'noun', "a controversial argument, as one against some opinion, doctrine, etc.")
    ];
    var round4 = [
      wordAudio('euro', 'E03/E0348100.mp3', 'noun', "the single European currency, which replaced the national currencies of France, Germany, Spain, Italy, Greece, Portugal, Luxembourg, Austria, Finland, the Republic of Ireland, Belgium, and the Netherlands in 2002. Seventeen member states of the European Union now use the euro."),
      wordAudio('wrinkle', 'W02/W0253100.mp3', 'noun', 'a small furrow or crease in the skin, especially of the face, as from aging or frowning.'),
      wordAudio('flattery', 'F02/F0201400.mp3', 'noun', "excessive and insincere praise, especially that given to further one's own interests. his healthy distrust of courtiers' flattery. synonyms:	praise, adulation, compliments, blandishments, honeyed words."),
      wordAudio('blossom', 'B04/B0426500.mp3', 'noun', 'the flower of a plant, especially of one producing an edible fruit.'),
      wordAudio('magma', 'M00/M0040300.mp3', 'noun', "Geology. molten material beneath or within the earth's crust, from which igneous rock is formed."),
      wordAudio('galaxy', 'G00/G0017200.mp3', 'noun', "Astronomy. a large system of stars held together by mutual gravitation and isolated from similar systems by vast regions of space."),
      wordAudio('catalog', 'C02/C0205000.mp3', 'noun', 'a list or record, as of items for sale or courses at a university, systematically arranged and often including descriptive material: a stamp catalog.'),
      wordAudio('lactose', 'L00/L0019100.mp3', 'noun', 'Biochemistry. a disaccharide, C <sub>12</sub> H <sub>22</sub> O <sub>11</sub> , present in milk, that upon hydrolysis yields glucose and galactose.'),
      wordAudio('diploma', 'D03/D0330100.mp3', 'noun', 'a document given by an educational institution conferring a degree on a person or certifying that the person has satisfactorily completed a course of study.'),
      wordAudio('emerald', 'E01/E0137800.mp3', 'noun', 'a rare variety of beryl that is colored green by chromium and valued as a gem.'),
      wordAudio('atrium', 'A07/A0789400.mp3', 'noun', "Architecture. Also called cavaedium. the main or central room of an ancient Roman house, open to the sky at the center and usually having a pool for the collection of rain water."),
      wordAudio('whiff', 'NEW/NEW16095.mp3', 'noun', 'a slight gust or puff of wind, air, vapor, smoke, or the like: a whiff of fresh air.'),
      wordAudio('phrasing', 'P04/P0402500.mp3', 'noun', 'the act of forming phrases.'),
      wordAudio('cyberspace', 'C10/C1082700.mp3', 'noun', 'the realm of electronic communication.'),
      wordAudio('mutiny', 'M07/M0712800.mp3', 'noun', 'revolt or rebellion against constituted authority, especially by sailors against their officers.'),
      wordAudio('origin', 'O01/O0158700.mp3', 'noun', 'something from which anything arises or is derived; source; fountainhead: to follow a stream to its origin.'),
      wordAudio('parable', 'P00/P0087100.mp3', 'noun', 'a short allegorical story designed to illustrate or teach some truth, religious principle, or moral lesson.'),
      wordAudio('chemistry', 'C03/C0366800.mp3', 'noun', 'the science that deals with the composition and properties of substances and various elementary forms of matter.'),
      wordAudio('swollen', 'S11/S1195200.mp3', 'verb', 'a past participle of swell. (especially of a part of the body) become larger or rounder in size, typically as a result of an accumulation of fluid.'),
      wordAudio('diagonal', 'D02/D0258400.mp3', 'adjective', 'Mathematics. connecting two nonadjacent angles or vertices of a polygon or polyhedron, as a straight line.'),
      wordAudio('personnel', 'P03/P0306700.mp3', 'noun', "a body of persons employed in an organization or place of work."),
      wordAudio('tapioca', 'T00/T0060800.mp3', 'noun', "a food substance prepared from cassava in granular, flake, pellet (pearl tapioca) or flour form, used in puddings, as a thickener, etc."),
      wordAudio('electrode', 'E00/E0088500.mp3', 'noun', "a conductor, not necessarily metallic, through which a current enters or leaves a nonmetallic medium, as an electrolytic cell, arc generator, vacuum tube, or gaseous discharge tube."),
      wordAudio('modular', 'M05/M0523000.mp3', 'adjective', "of or relating to a module or a modulus."),
      wordAudio('quagmire', 'Q00/Q0014600.mp3', 'noun', "an area of miry or boggy ground whose surface yields under the tread; a bog.")
    ];
    var round5 = [
      wordAudio('fulfill', 'F04/F0407400.mp3', 'verb (used with object)', "making someone satisfied or happy because of fully developing their character or abilities: a fulfilling and rewarding career"),
      wordAudio('hammock', 'H00/H0054400.mp3', 'noun', 'a hanging bed or couch made of canvas, netted cord, or the like, with cords attached to supports at each end.'),
      wordAudio('magma', 'M00/M0040300.mp3', 'noun', "Geology. molten material beneath or within the earth's crust, from which igneous rock is formed."),
      wordAudio('everglades', 'E03/E0364100.mp3', 'noun', 'a swampy and partly forested region in S Florida, mostly S of Lake Okeechobee. Over 5000 sq. mi. (12,950 sq. km).'),
      wordAudio('snippet', 'S06/S0663800.mp3', 'noun', 'a small piece snipped off; a small bit, scrap, or fragment: an anthology of snippets.'),
      wordAudio('grumble', 'G03/G0372300.mp3', 'verb (used without object)', 'to murmur or mutter in discontent; complain sullenly.'),
      wordAudio('granola', 'G03/G0303400.mp3', 'noun', 'a breakfast food consisting of rolled oats, brown sugar, nuts, dried fruit, etc., usually served with milk.'),
      wordAudio('umpire', 'U00/U0023200.mp3', 'noun', 'a person selected to rule on the plays in a game.'),
      wordAudio('americana', 'A03/A0386300.mp3', 'noun', '(often used with a plural verb) books, papers, maps, etc., relating to America, especially to its history, culture, and geography.'),
      wordAudio('nimble', 'N01/N0146500.mp3', 'adjective', 'quick and light in movement; moving with ease; agile; active; rapid: nimble feet.'),
      wordAudio('trinket', 'T05/T0503200.mp3', 'noun', 'a small ornament, piece of jewelry, etc., usually of little value.'),
      wordAudio('pedigree', 'P02/P0206900.mp3', 'noun', 'an ancestral line; line of descent; lineage; ancestry.'),
      wordAudio('hubbub', 'H04/H0420100.mp3', 'noun', 'a loud, confused noise, as of many voices: There was quite a hubbub in the auditorium after the announcement.'),
      wordAudio('several', 'S03/S0383400.mp3', 'adjective', 'being more than two but fewer than many in number or kind: several ways of doing it.'),
      wordAudio('torrent', 'T03/T0385500.mp3', 'noun', 'a stream of water flowing with great rapidity and violence.'),
      wordAudio('announcer', 'A05/A0504000.mp3', 'noun', 'a person who announces, especially one who introduces programs, presents news items, reads advertisements, and does other similar assignments over radio or television.'),
      wordAudio('beverage', 'B02/B0288900.mp3', 'noun', 'any potable liquid, especially one other than water, as tea, coffee, beer, or milk: The price of the meal includes a beverage.'),
      wordAudio('waist', 'W00/W0011400.mp3', 'noun', 'the part of the body in humans between the ribs and the hips, usually the narrowest part of the torso.'),
      wordAudio('valiant', 'V00/V0015000.mp3', 'adjective', 'boldly courageous; brave; stout-hearted: a valiant soldier.'),
      wordAudio('thigh', 'T02/T0232500.mp3', 'noun', 'the part of the lower limb in humans between the hip and the knee.'),
      wordAudio('truce', 'T05/T0536000.mp3', 'noun', 'a suspension of hostilities for a specified period of time by mutual agreement of the warring parties; cease-fire; armistice.'),
      wordAudio('masterpiece', 'M01/M0195600.mp3', 'noun', "a person's greatest piece of work, as in an art."),
      wordAudio('nonfiction', 'N01/N0194800.mp3', 'noun', 'the branch of literature comprising works of narrative prose dealing with or offering opinions or conjectures upon facts and reality, including biography, history, and the essay (opposed to fiction and distinguished from poetry and drama).'),
      wordAudio('platoon', 'P05/P0530100.mp3', 'noun', 'a military unit consisting of two or more squads or sections and a headquarters.')
    ];
    var round6 = [
      wordAudio('junior', 'J01/J0114600.mp3', 'adjective', 'younger (designating the younger of two men bearing the same full name, as a son named after his father; often written as Jr. or jr. following the name): May I speak with the junior Mr. Hansen?'),
      wordAudio('kangaroo', 'K00/K0020600.mp3', 'noun', 'any herbivorous marsupial of the family Macropodidae, of Australia and adjacent islands, having a small head, short forelimbs, powerful hind legs used for leaping, and a long, thick tail: several species are threatened or endangered.'),
      wordAudio('excuse', 'E03/E0387400.mp3', 'verb (used with object)', 'to regard or judge with forgiveness or indulgence; pardon or forgive; overlook (a fault, error, etc.): Excuse his bad manners.'),
      wordAudio('astronaut', 'A07/A0767700.mp3', 'noun', 'a person engaged in or trained for spaceflight.'),
      wordAudio('lyrics', 'L04/L0458200.mp3', 'adjective', "(of poetry) having the form and musical quality of a song, and especially the character of a songlike outpouring of the poet's own thoughts and feelings, as distinguished from epic and dramatic poetry."),
      wordAudio('breadwinner', 'B05/B0592200.mp3', 'noun', 'a person who earns a livelihood, especially one who also supports dependents.'),
      wordAudio('worrywart', 'W02/W0243400.mp3', 'noun', 'a person who tends to worry habitually and often needlessly; pessimist; fussbudget.'),
      wordAudio('cymbals', 'C10/C1093500.mp3', 'noun', 'a concave plate of brass or bronze that produces a sharp, ringing sound when struck: played either in pairs, by being struck together, or singly, by being struck with a drumstick or the like.'),
      wordAudio('dispel', 'D03/D0377600.mp3', 'verb (used with object)', 'to drive off in various directions; disperse; dissipate: to dispel the dense fog.'),
      wordAudio('phrasing', 'P04/P0402500.mp3', 'noun', 'the act of forming phrases.'),
      wordAudio('dwindled', 'D06/D0601200.mp3', 'verb (used without object)', 'to become smaller and smaller; shrink; waste away: His vast fortune has dwindled away.'),
      wordAudio('soprano', 'S07/S0730300.mp3', 'noun', "the uppermost part or voice."),
      wordAudio('tropical', 'T05/T0528800.mp3', 'adjective', "pertaining to, characteristic of, occurring in, or inhabiting the tropics, especially the humid tropics: tropical flowers."),
      wordAudio('tarnish', 'T00/T0068500.mp3', 'verb (used with object)', "to dull the luster of (a metallic surface), especially by oxidation; discolor."),
      wordAudio('fondant', 'F02/F0265800.mp3', 'noun', "a thick, creamy sugar paste, the basis of many candies."),
      wordAudio('cyberspace', 'C10/C1082700.mp3', 'noun', "the realm of electronic communication."),
      wordAudio('prowess', 'P08/P0873700.mp3', 'noun', "exceptional valor, bravery, or ability, especially in combat or battle."),
      wordAudio('measly', 'M02/M0245600.mp3', 'adjective', "Informal. contemptibly small, meager, or slight: They paid me a measly fifteen dollars for a day's work. wretchedly bad or unsatisfactory: a measly performance."),
      wordAudio('trellis', 'T04/T0463700.mp3', 'noun', "a frame or structure of latticework; lattice."),
      wordAudio('autumn', 'A08/A0841600.mp3', 'noun', "the season between summer and winter; fall. In the Northern Hemisphere it is from the September equinox to the December solstice; in the Southern Hemisphere it is from the March equinox to the June solstice."),
      wordAudio('variety', 'V00/V0038500.mp3', 'noun', "the state of being varied or diversified: to give variety to a diet."),
      wordAudio('parable', 'P00/P0087100.mp3', 'noun', "a short allegorical story designed to illustrate or teach some truth, religious principle, or moral lesson."),
      wordAudio('splurge', 'S08/S0827500.mp3', 'verb (used without object)', "to indulge oneself in some luxury or pleasure, especially a costly one: They splurged on a trip to Europe."),
      wordAudio('balderdash', 'B00/B0051600.mp3', 'noun', "senseless, stupid, or exaggerated talk or writing; nonsense."),
      wordAudio('hodgepodge', 'H03/H0317000.mp3', 'noun', "a heterogeneous mixture; jumble."),
    ];
    var round7 = [
      wordAudio('superlative', 'S11/S1132500.mp3', 'adjective', "of the highest kind, quality, or order; surpassing all else or others; supreme; extreme: superlative wisdom."),
      wordAudio('victorian', 'V01/V0116300.mp3', 'adjective', "of or relating to Queen Victoria or the period of her reign: Victorian poets."),
      wordAudio('columnist', 'C06/C0667200.mp3', 'noun', "the writer or editor of a newspaper or magazine column."),
      wordAudio('bewilder', 'B02/B0290000.mp3', 'verb (used with object)', "to confuse or puzzle completely; perplex: These shifting attitudes bewilder me."),
      wordAudio('hammock', 'H00/H0054400.mp3', 'noun', "a hanging bed or couch made of canvas, netted cord, or the like, with cords attached to supports at each end."),
      wordAudio('squander', 'S08/S0857200.mp3', 'verb (used with object)', "to spend or use (money, time, etc.) extravagantly or wastefully (often followed by away)."),
      wordAudio('curfew', 'C10/C1055100.mp3', 'noun', "an order establishing a specific time in the evening after which certain regulations apply, especially that no civilians or other specified group of unauthorized persons may be outdoors or that places of public assembly must be closed."),
      wordAudio('absurd', 'A00/A0041700.mp3', 'adjective', "utterly or obviously senseless, illogical, or untrue; contrary to all reason or common sense; laughably foolish or false: an absurd explanation."),
      wordAudio('hoity-toity', 'H03/H0324200.mp3', 'adjective', "assuming airs; pretentious; haughty."),
      wordAudio('whiff', 'NEW/NEW16095.mp3', 'noun', "a slight gust or puff of wind, air, vapor, smoke, or the like: a whiff of fresh air."),
      wordAudio('fundamental', 'F04/F0417500.mp3', 'adjective', "serving as, or being an essential part of, a foundation or basis; basic; underlying: fundamental principles; the fundamental structure."),
      wordAudio('approximate', 'A06/A0619000.mp3', 'adjective', "near or approaching a certain state, condition, goal, or standard."),
      wordAudio('infrastructure', 'I01/I0166800.mp3', 'noun', "the basic, underlying framework or features of a system or organization."),
      wordAudio('commodious', 'C06/C0686300.mp3', 'adjective', "spacious and convenient; roomy: a commodious apartment."),
      wordAudio('machination', 'M00/M0009800.mp3', 'noun', "an act or instance of machinating."),
      wordAudio('ramification', 'R00/R0048800.mp3', 'noun', "the act or process of ramifying."),
      wordAudio('schnitzel', 'S01/S0179900.mp3', 'noun', "a cutlet, especially of veal."),
      wordAudio('susurration', 'S11/S1167000.mp3', 'noun', "a soft murmur; whisper."),
      wordAudio('ecclesiastical', 'E00/E0020600.mp3', 'adjective', "of or relating to the church or the clergy; churchly; clerical; not secular."),
      wordAudio('insouciance', 'I02/I0206800.mp3', 'noun', "the quality of being insouciant; lack of care or concern; indifference."),
      wordAudio('cheongsam', 'C03/C0372900.mp3', 'noun', "a form-fitting, knee-length dress with a mandarin collar and slit skirt, worn chiefly by Chinese women."),
      wordAudio('eleemosynary', 'E01/E0100500.mp3', 'adjective', "of or relating to alms, charity, or charitable donations; charitable."),
      wordAudio('Iroquois', 'I03/I0305400.mp3', 'noun', "a member of a North American Indian confederacy, the Five Nations, comprising the Mohawks, Oneidas, Onondagas, Cayugas, and Senecas, and later the Tuscaroras."),
      wordAudio('tractor', 'T04/T0420800.mp3', 'noun', "a powerful motor-driven vehicle with large, heavy treads, used for pulling farm machinery, other vehicles, etc."),
      wordAudio('garlic', 'G00/G0054400.mp3', 'noun', "a hardy plant, Allium sativum, of the amaryllis family whose strongly, pungent bulb is used in cookery and medicine."),
    ];
    var round8 = [
      wordAudio('likable', 'L02/L0252200.mp3', 'adjective', "readily or easily liked; pleasing: a likable young man."),
      wordAudio('hinge', 'H02/H0291800.mp3', 'noun', "a jointed device or flexible piece on which a door, gate, shutter, lid, or other attached part turns, swings, or moves."),
      wordAudio('future', 'F04/F0434600.mp3', 'noun', "time that is to be or come hereafter."),
      wordAudio('gusto', 'G04/G0411200.mp3', 'noun', "hearty or keen enjoyment, as in eating or drinking, or in action or speech in general: to dance with gusto."),
      wordAudio("o'clock", 'O00/O0031600.mp3', 'adverb', "of, by, or according to the clock (used in specifying the hour of the day): It is now 4 o'clock."),
      wordAudio('upshot', 'U01/U0148500.mp3', 'noun', "the final issue, the conclusion, or the result: The upshot of the disagreement was a new bylaw."),
      wordAudio('barter', 'B01/B0123900.mp3', 'verb (used without object)', "to trade by exchange of commodities rather than by the use of money."),
      wordAudio('hefty', 'H01/H0159800.mp3', 'adjective', "heavy; weighty: a hefty book."),
      wordAudio('glimmer', 'G01/G0189300.mp3', 'noun', "a faint or unsteady light; gleam."),
      wordAudio('jackpot', 'J00/J0005900.mp3', 'noun', "the chief prize or the cumulative stakes in a game or contest, as in bingo, a quiz contest, or a slot machine."),
      wordAudio('plaza', 'P05/P0537300.mp3', 'noun', "a public square or open space in a city or town."),
      wordAudio('naysayer', 'N00/N0046900.mp3', 'noun', "a person who habitually expresses negative or pessimistic views: Despite a general feeling that things were going well, a few naysayers tried to cast gloom."),
      wordAudio('around', 'A06/A0693200.mp3', 'adverb', "in a circle, ring, or the like; so as to surround a person, group, thing, etc.: The crowd gathered around."),
      wordAudio('splendid', 'S08/S0823800.mp3', 'adjective', "gorgeous; magnificent; sumptuous. Synonyms: luxurious, dazzling, imposing."),
      wordAudio('zinger', 'Z00/Z0028900.mp3', 'noun', "a quick, witty, or pointed remark or retort: During the debate she made a couple of zingers that deflated the opposition."),
      wordAudio('band-aid', 'B00/B0072100.mp3', 'noun', "a brand of adhesive bandage with a gauze pad in the center, used to cover minor abrasions and cuts."),
      wordAudio('watchdog', 'W00/W0052400.mp3', 'noun', "a dog kept to guard property."),
      wordAudio('dearly', 'D00/D0069700.mp3', 'adjective', "beloved or loved: a dear friend."),
      wordAudio('impostor', 'I00/I0082500.mp3', 'noun', "a person who practices deception under an assumed character, identity, or name."),
      wordAudio('tirade', 'T03/T0320100.mp3', 'noun', "a prolonged outburst of bitter, outspoken denunciation: a tirade against smoking."),
      wordAudio('drench', 'D05/D0526600.mp3', 'verb (used with object)', "to wet thoroughly; soak."),
      wordAudio('buoyancy', 'B07/B0703700.mp3', 'noun', "the power to float or rise in a fluid; relative lightness."),
      wordAudio('bonkers', 'B04/B0488000.mp3', 'adjective', "mentally unbalanced; mad; crazy."),
      wordAudio('seldom', 'S02/S0280100.mp3', 'adverb', "on only a few occasions; rarely; infrequently; not often: We seldom see our old neighbors anymore."),
      wordAudio('calico', 'C00/C0046600.mp3', 'noun', "a plain-woven cotton cloth printed with a figured pattern, usually on one side.")
    ];
    var round9 = [
      wordAudio('postpone', 'P06/P0677200.mp3', 'verb (used with object)', "to put off to a later time; defer: He has postponed his departure until tomorrow."),
      wordAudio('coward', 'C09/C0930400.mp3', 'noun', "a person who lacks courage in facing danger, difficulty, opposition, pain, etc.; a timid or easily intimidated person."),
      wordAudio('error', 'E02/E0284800.mp3', 'noun', "a deviation from accuracy or correctness; a mistake, as in action or speech: His speech contained several factual errors."),
      wordAudio('owlishly', 'O02/O0271300.mp3', 'adjective', "resembling or characteristic of an owl: His thick glasses give him an owlish appearance."),
      wordAudio('barrel', 'B01/B0118100.mp3', 'noun', "a cylindrical wooden container with slightly bulging sides made of staves hooped together, and with flat, parallel ends."),
      wordAudio('beagle', 'B01/B0174300.mp3', 'noun', "one of a breed of small hounds having long ears, short legs, and a usually black, tan, and white coat."),
      wordAudio('bawl', 'B01/B0165700.mp3', 'verb (used without object)', "to cry or wail lustily."),
      wordAudio('tomorrow', 'T03/T0357600.mp3', 'noun', "the day following today: Tomorrow is supposed to be sunny."),
      wordAudio('crumb', 'C10/C1011200.mp3', 'noun', "a small particle of bread, cake, etc., that has broken off."),
      wordAudio('dough', 'D04/D0491400.mp3', 'noun', "flour or meal combined with water, milk, etc., in a mass for baking into bread, cake, etc.; paste of bread."),
      wordAudio('rattler', 'R00/R0078600.mp3', 'noun', "a rattlesnake."),
      wordAudio('medley', 'M02/M0260600.mp3', 'noun', "a mixture, especially of heterogeneous elements; hodgepodge; jumble."),
      wordAudio('difficult', 'D02/D0295400.mp3', 'adjective', "not easily or readily done; requiring much labor, skill, or planning to be performed successfully; hard: a difficult job."),
      wordAudio('fringe', 'F03/F0379100.mp3', 'noun', "a decorative border of thread, cord, or the like, usually hanging loosely from a raveled edge or separate strip."),
      wordAudio('casserole', 'C01/C0192200.mp3', 'noun', "a baking dish of glass, pottery, etc., usually with a cover."),
      wordAudio('platinum', 'P05/P0529100.mp3', 'noun', "Chemistry. a heavy, grayish-white, highly malleable and ductile metallic element, resistant to most chemicals, practically unoxidizable except in the presence of bases, and fusible only at extremely high temperatures: used for making chemical and scientific apparatus, as a catalyst in the oxidation of ammonia to nitric acid, and in jewelry. Symbol:  Pt; atomic weight:  195.09; atomic number:  78; specific gravity:  21.5 at 20&#176;C."),
      wordAudio('mundane', 'M06/M0687000.mp3', 'adjective', "common; ordinary; banal; unimaginative."),
      wordAudio('alpaca', 'A03/A0346700.mp3', 'noun', "a domesticated South American ruminant, Lama pacos, having long, soft, silky fleece, related to the llama and believed to be a variety of the guanaco."),
      wordAudio('billiards', 'B03/B0331100.mp3', 'noun', "any of several games played with hard balls of ivory or of a similar material that are driven with a cue on a cloth-covered table enclosed by a raised rim of rubber, especially a game played with a cue ball and two object balls on a table without pockets."),
      wordAudio('cyclone', 'C10/C1087200.mp3', 'noun', "a large-scale, atmospheric wind-and-pressure system characterized by low pressure at its center and by circular wind motion, counterclockwise in the Northern Hemisphere, clockwise in the Southern Hemisphere."),
      wordAudio('scrooge', 'S02/S0228200.mp3', 'verb (used with or without object)', "scrouge."),
      wordAudio('genteel', 'G01/G0106000.mp3', 'adjective', "belonging or suited to polite society."),
      wordAudio('collude', 'C06/C0651400.mp3', 'verb (used without object)', "to act together through a secret understanding, especially with evil or harmful intent."),
      wordAudio('guardian', 'G03/G0381500.mp3', 'noun', "a person who guards, protects, or preserves."),
      wordAudio('mosaic', 'M06/M0624500.mp3', 'noun', "a picture or decoration made of small, usually colored pieces of inlaid stone, glass, etc."),
    ];
    var round10 = [
      wordAudio('enunciate', 'E02/E0221600.mp3', 'verb (used with object)', "to utter or pronounce (words, sentences, etc.), especially in an articulate or a particular manner: He enunciates his words distinctly."),
      wordAudio('melodramatic', 'M02/M0287400.mp3', 'adjective', "of, like, or befitting melodrama."),
      wordAudio('epoxy', 'E02/E0259600.mp3', 'adjective', "having the structure of an epoxide."),
      wordAudio('chortle', 'C04/C0448200.mp3', 'verb (used without object)', "to chuckle gleefully."),
      wordAudio('yurt', 'Y00/Y0052200.mp3', 'noun', "a tentlike dwelling of the Mongol and Turkic peoples of central Asia, consisting of a cylindrical wall of poles in a lattice arrangement with a conical roof of poles, both covered by felt or skins."),
      wordAudio('wysiwyg', 'W02/W0262600.mp3', 'adjective', "of, relating to, or noting a screen display that shows text exactly as it will appear in printed output, including underlining, various typefaces, as italics, line spacing, end-of-line breaks, and paragraph indentations."),
      wordAudio('banquet', 'B00/B0084900.mp3', 'noun', "a lavish meal; feast."),
      wordAudio('escarpment', 'E02/E0294100.mp3', 'noun', "Geology. a long, precipitous, clifflike ridge of land, rock, or the like, commonly formed by faulting or fracturing of the earth's crust."),
      wordAudio('zealous', 'Z00/Z0010800.mp3', 'adjective', "full of, characterized by, or due to zeal; ardently active, devoted, or diligent. Synonyms: enthusiastic, eager, fervid, fervent, intense, passionate, warm."),
      wordAudio('decor', 'D00/D0099700.mp3', 'noun', "style or mode of decoration, as of a room, building, or the like: modern office d&#233;cor; a bedroom having a Spanish d&#233;cor."),
      wordAudio('revelation', 'R02/R0262500.mp3', 'noun', "the act of revealing or disclosing; disclosure."),
      wordAudio('vague', 'V00/V0007300.mp3', 'adjective', "not clearly or explicitly stated or expressed: vague promises."),
      wordAudio('cumulus', 'C10/C1045200.mp3', 'noun', "a heap; pile."),
      wordAudio('montage', 'M05/M0584800.mp3', 'noun', "the technique of combining in a single composition pictorial elements from various sources, as parts of different photographs or fragments of printing, either to give the illusion that the elements belonged together originally or to allow each element to retain its separate identity as a means of adding interest or meaning to the composition."),
      wordAudio('query', 'Q00/Q0033800.mp3', 'noun', "a question; an inquiry."),
      wordAudio('maximum', 'M02/M0224900.mp3', 'noun', "the greatest quantity or amount possible, assignable, allowable, etc."),
      wordAudio('territory', 'T01/T0166900.mp3', 'noun', "any tract of land; region or district."),
      wordAudio('nationalism', 'N00/N0037800.mp3', 'noun', "spirit or aspirations common to the whole of a nation."),
      wordAudio('latency', 'L00/L0099800.mp3', 'noun', "the state of being latent."),
    ];
    var round11 = [
      wordAudio('synthetic', 'S12/S1227000.mp3', 'adjective', "of, pertaining to, proceeding by, or involving synthesis (opposed to analytic)."),
    ];
    var round12 = [
      wordAudio('tranquil', 'T04/T0431700.mp3', 'adjective', "free from commotion or tumult; peaceful; quiet; calm: a tranquil country place."),
    ];
    var round13 = [
      wordAudio('hypnotic', 'H05/H0505900.mp3', 'adjective', "of or relating to hypnosis or hypnotism."),
    ];
    var round14 = [
      wordAudio('approximate', 'A06/A0619000.mp3', 'adjective', "near or approaching a certain state, condition, goal, or standard."),
    ];
    var round15 = [
      wordAudio('sustainable', 'NEW2014/4417583.mp3', 'adjective', "capable of being supported or upheld, as by having its weight borne from below."),
    ];
    var round16 = [
      wordAudio('tarmac', 'T00/T0067900.mp3', 'noun', "a brand of bituminous binder, similar to tarmacadam, for surfacing roads, airport runways, parking areas, etc."),
    ];
    var round17 = [
      wordAudio('alfresco', 'A02/A0298700.mp3', 'adverb', "out-of-doors; in the open air: to dine alfresco."),
    ];
    var round18 = [
      wordAudio('gemini', 'G00/G0091100.mp3', 'plural noun', "Astronomy. the Twins, a zodiacal constellation between Taurus and Cancer containing the bright stars Castor and Pollux."),
    ];

    $scope.bee = {
      mode: 'study',
      practicing: undefined,
      roundLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
      rounds: [round1, round2, round3, round4, round5, round6, round7, round8, round9, round10, round11, round12, round13,
          round14, round15, round16, round17, round18],
      round: 0,
      wordIdx: 0,
      level: 'A',
      scored: false,
      colors: ['#0a0a0a', '#141414','#1f1f1f','#292929','#333333','#3d3d3d','#474747','#525252','#5c5c5c','#666666','#707070','#7a7a7a']
    };

    $scope.words = $scope.bee.rounds[0];
    $scope.values = new Array($scope.words.length);
    $scope.checks = new Array($scope.words.length);
    $scope.congrats = new Array($scope.bee.rounds.length);

    $scope.xcongrats = function() {
      return $scope.congrats[$scope.bee.round]===true;
    };

    $scope.xcolor = function(idx) {
      if ($scope.bee.scored) {
        if($scope.testWords.map(function(x){return x.text;})[idx] === document.getElementById('spelling'+idx).value) {
          return '#10b12a';
        } else {
          return '#df2602';
        }
      } else {
        return $scope.bee.colors[idx];
      }
    };

    $scope.checkWord = function(text, value, idx) {
      var x = text === value? 1 : 0;
      $scope.checks[idx] = x;
      $scope.values[idx] = value;
      var expected = $scope.checks.length;
      var actual = $scope.checks.filter(function(x){return x===1}).length;
      if(expected === actual) {
        $scope.allwords = $scope.words.map(function(x){return x.text;}).join(', ');
        $scope.congrats[$scope.bee.round] = true;
        $scope.bee.mode = 'congrats';
        angular.element(document.getElementById('fanfarrias').play());
      } else {
        if(x === 1) {
          angular.element(document.getElementById('ding').play());
          $scope.bee.wordIdx=idx+1;
          setTimeout(function(){
            focus('spelling'+$scope.bee.wordIdx);
            setTimeout(function(){
              angular.element(document.getElementById('audio-player'+ $scope.bee.wordIdx).play());
            },1000);
          }, 1000);
        } else {
          angular.element(document.getElementById('buzzer').play());
          focus('spelling'+idx);
        }
      }
    };

    $scope.testWord = function(idx) {
      var testIdx = idx + 1;
      if(testIdx < $scope.testWords.length) {
        focus('spelling' + testIdx);
        $scope.play(testIdx);
      }
    };

    $scope.score = function() {
      var values = []
      for(var i=0;i<$scope.testWords.length;i++) {
        values.push(document.getElementById('spelling'+i).value);
      }

      var expected = $scope.testWords.map(function(x){return x.text;});
      var errors = 0;
      for(var i=0;i<expected.length;i++) {
        if(values[i] !== expected[i]) {
          errors += 1;
        }
      }
      $scope.bee.score = 10 * (10 - errors);
    };

    $scope.up = function() {
      // focus('take-test');
      // $window.scrollTo(0, 0);
      $state.reload();
    };

    $scope.loadRound = function(idx) {
      $scope.words = $scope.bee.rounds[idx];
      $scope.checks = new Array($scope.words.length);
      $scope.values = new Array($scope.words.length);
      $scope.bee.mode='study';
      $scope.bee.round = idx;
      $scope.bee.level = $scope.bee.roundLabels[idx];
    };

    $scope.play = function(idx) {
      angular.element(document.getElementById('audio-player'+idx).play());
    }
  }
])
.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element) {
          element.focus();
        }
      });
    };
})
.factory('xscroll', function($timeout, $window) {
    return function(id) {
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element) {
          $window.scrollTo(0, element.offsetTop-30);
        }
      });
    };
})
.directive('eventFocus', function(focus) {
   return function(scope, elem, attr) {
     elem.on(attr.eventFocus, function() {
       focus(attr.eventFocusId);
     });

     // Removes bound events in the element itself
     // when the scope is destroyed
     scope.$on('$destroy', function() {
       elem.off(attr.eventFocus);
     });
   };
})
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})
.directive('lowered', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var lower = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var xlowered = inputValue.toLowerCase();
           if(xlowered !== inputValue) {
              modelCtrl.$setViewValue(xlowered);
              modelCtrl.$render();
            }
            return xlowered;
         }
         modelCtrl.$parsers.push(lower);
         lower(scope[attrs.ngModel]);
     }
   };
})
.directive('focusMe', function($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      element.bind('blur', function() {
         scope.$apply(model.assign(scope, false));
      });
    }
  };
});


// word not found: jersey
// word not found: people
// word not found: cough
// word not found: marlin
// word not found: warning
// word not found: sonar
// word not found: forum
// word not found: silent
// word not found: domino
// word not found: glance
// word not found: curries
// word not found: atomic
// word not found: native
// word not found: clutch
// word not found: polar
// word not found: field
// word not found: ocean
// word not found: acre
// word not found: euro
// word not found: wrinkle
// word not found: flattery
// word not found: blossom
// word not found: magma
// word not found: galaxy
// word not found: catalog
// word not found: lactose
// word not found: diploma
// word not found: smidge
// word not found: everglades
// word not found: emerald
// word not found: atrium
// word not found: phrasing
// word not found: cyberspace
// word not found: origin
// word not found: parable
// word not found: chemistry
// word not found: swollen
// word not found: diagonal
// word not found: fulfilling
// word not found: hammock
// word not found: whiff
      // wordAudio('curries', 'C10/C1059800.mp3', 'noun, verb (used with object)', '<a class="dbox-xref dbox-roman" href="http://dictionary.reference.com/browse/curry">curry</a><span class="dbox-hn"><sup>1</sup> .'),

      // wordAudio('fundamental', 'F04/F0417500.mp3'),
      // wordAudio('approximate', 'A06/A0619000.mp3'),
      // wordAudio('infrastructure', 'I01/I0166800.mp3'),
      // wordAudio('commodious', 'C06/C0686300.mp3'),
      // wordAudio('machination', 'M00/M0009800.mp3'),
      // wordAudio('ramification', 'R00/R0048800.mp3'),
      // wordAudio('schnitzel', 'S01/S0179900.mp3'),
      // wordAudio('susurration', 'S11/S1167000.mp3'),
      // wordAudio('ecclesiastical', 'E00/E0020600.mp3'),
      // wordAudio('insouciance', 'I02/I0206800.mp3'),
      // wordAudio('cheongsam', 'C03/C0372900.mp3'),
      // wordAudio('eleemosynary', 'E01/E0100500.mp3'),
      // wordAudio('Iroquois', 'I03/I0305400.mp3'),
      // wordAudio('tractor', 'T04/T0420800.mp3'),
      // wordAudio('likable', 'L02/L0252200.mp3'),
      // wordAudio('hinge', 'H02/H0291800.mp3'),
      // wordAudio('future', 'F04/F0434600.mp3'),
      // wordAudio('gusto', 'G04/G0411200.mp3'),
      // wordAudio("o'clock", 'O00/O0031600.mp3'),
      // wordAudio('upshot', 'U01/U0148500.mp3'),
      // wordAudio('barter', 'B01/B0123900.mp3'),
      // wordAudio('hefty', 'H01/H0159800.mp3'),
      // wordAudio('glimmer', 'G01/G0189300.mp3'),
      // wordAudio('jackpot', 'J00/J0005900.mp3'),
      // wordAudio('garlic', 'G00/G0054400.mp3'),
      // wordAudio('plaza', 'P05/P0537300.mp3'),
      // wordAudio('naysayer', 'N00/N0046900.mp3'),
      // wordAudio('around', 'A06/A0693200.mp3'),
      // wordAudio('layover', 'L01/L0126000.mp3'),
      // wordAudio('splendid', 'S08/S0823800.mp3'),
      // wordAudio('zinger', 'Z00/Z0028900.mp3'),
      // wordAudio('Band-Aid', 'B00/B0072100.mp3'),
      // wordAudio('watchdog', 'W00/W0052400.mp3'),
      // wordAudio('dearly', 'D00/D0069700.mp3'),
      // wordAudio('impostor', 'I00/I0082500.mp3'),
      // wordAudio('tirade', 'T03/T0320100.mp3'),
      // wordAudio('postpone', 'P06/P0677200.mp3'),
      // wordAudio('coward', 'C09/C0930400.mp3'),
      // wordAudio('error', 'E02/E0284800.mp3'),
      // wordAudio('owlishly', 'O02/O0271300.mp3'),
      // wordAudio('barrel', 'B01/B0118100.mp3'),
      // wordAudio('beagle', 'B01/B0174300.mp3'),
      // wordAudio('bawl', 'B01/B0165700.mp3'),
      // wordAudio('tomorrow', 'T03/T0357600.mp3'),
      // wordAudio('crumb', 'C10/C1011200.mp3'),
      // wordAudio('dough', 'D04/D0491400.mp3'),
      // wordAudio('rattler', 'R00/R0078600.mp3'),
      // wordAudio('medley', 'M02/M0260600.mp3'),
      // wordAudio('difficult', 'D02/D0295400.mp3'),
      // wordAudio('drench', 'D05/D0526600.mp3'),
      // wordAudio('bonkers', 'B04/B0488000.mp3'),
      // wordAudio('seldom', 'S02/S0280100.mp3'),
      // wordAudio('fringe', 'F03/F0379100.mp3'),
      // wordAudio('calico', 'C00/C0046600.mp3'),
      // wordAudio('mutiny', 'M07/M0712800.mp3'),
      // wordAudio('snippet', 'S06/S0663800.mp3'),
      // wordAudio('grumbling', 'G03/G0372300.mp3'),
      // wordAudio('granola', 'G03/G0303400.mp3'),
      // wordAudio('umpire', 'U00/U0023200.mp3'),
      // wordAudio('Americana', 'A03/A0386300.mp3'),
      // wordAudio('nimble', 'N01/N0146500.mp3'),
      // wordAudio('trinket', 'T05/T0503200.mp3'),
      // wordAudio('showhorn', 'S04/S0463200.mp3'),
      // wordAudio('pedigree', 'P02/P0206900.mp3'),
      // wordAudio('hubbub', 'H04/H0420100.mp3'),
      // wordAudio('several', 'S03/S0383400.mp3'),
      // wordAudio('torrent', 'T03/T0385500.mp3'),
      // wordAudio('announcer', 'A05/A0504000.mp3'),
      // wordAudio('beverage', 'B02/B0288900.mp3'),
      // wordAudio('waist', 'W00/W0011400.mp3'),
      // wordAudio('valiant', 'V00/V0015000.mp3'),
      // wordAudio('thigh', 'T02/T0232500.mp3'),
      // wordAudio('truce', 'T05/T0536000.mp3'),
      // wordAudio('masterpiece', 'M01/M0195600.mp3'),
      // wordAudio('nonfiction', 'N01/N0194800.mp3'),
      // wordAudio('platoon', 'P05/P0530100.mp3'),
      // wordAudio('junior', 'J01/J0114600.mp3'),
      // wordAudio('kangaroo', 'K00/K0020600.mp3'),
      // wordAudio('excuse', 'E03/E0387400.mp3'),
      // wordAudio('astronaut', 'A07/A0767700.mp3'),
      // wordAudio('lyrics', 'L04/L0458200.mp3'),
      // wordAudio('breadwinner', 'B05/B0592200.mp3'),
      // wordAudio('worrywart', 'W02/W0243400.mp3'),
      // wordAudio('cymbals', 'C10/C1093500.mp3'),
      // wordAudio('dispel', 'D03/D0377600.mp3'),
      // wordAudio('dwindled', 'D06/D0601200.mp3'),
      // wordAudio('medin', 'M02/M0253800.mp3'),
      // wordAudio('soprano', 'S07/S0730300.mp3'),
      // wordAudio('tropical', 'T05/T0528800.mp3'),
      // wordAudio('tarnish', 'T00/T0068500.mp3'),
      // wordAudio('fondant', 'F02/F0265800.mp3'),
      // wordAudio('prowess', 'P08/P0873700.mp3'),
      // wordAudio('measly', 'M02/M0245600.mp3'),
      // wordAudio('trellis', 'T04/T0463700.mp3'),
      // wordAudio('autumn', 'A08/A0841600.mp3'),
      // wordAudio('variety', 'V00/V0038500.mp3'),
      // wordAudio('moxie', 'M06/M0650800.mp3'),
      // wordAudio('splurge', 'S08/S0827500.mp3'),
      // wordAudio('balderdash', 'B00/B0051600.mp3'),
      // wordAudio('hodgepodge', 'H03/H0317000.mp3'),
      // wordAudio('superlative', 'S11/S1132500.mp3'),
      // wordAudio('victorian', 'V01/V0116300.mp3'),
      // wordAudio('columnist', 'C06/C0667200.mp3'),
      // wordAudio('bewilder', 'B02/B0290000.mp3'),
      // wordAudio('squander', 'S08/S0857200.mp3'),
      // wordAudio('curfew', 'C10/C1055100.mp3'),
      // wordAudio('absurd', 'A00/A0041700.mp3'),
      // wordAudio('hoity-toity', 'H03/H0324200.mp3'),
      // wordAudio('buoyancy', 'B07/B0703700.mp3'),
      // wordAudio('leitmotif', 'L01/L0168400.mp3'),
// wordAudio('layover', 'L01/L0126000.mp3', 'noun', "stopover."),
