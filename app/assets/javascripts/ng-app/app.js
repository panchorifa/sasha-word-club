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
.controller('AppCtrl', ['$scope',
  function ($scope) {
  }
])
.controller('WordsCtrl', ['$scope', '$sce',
  function ($scope, $sce) {
    var AUDIO_URL = 'http://static.sfdict.com/staticrep/dictaudio/';
    var wordAudio = function(word, audio, pg, definition) {
      return {
        text: word,
        audio: $sce.trustAsResourceUrl(AUDIO_URL+audio),
        pg: pg,
        definition: definition
      };
    };
    $scope.mode = 'test';
    $scope.simon = function(x) {
      $scope.mode = x;
    }

    $scope.effects = {
      ding: 'http://newt.phys.unsw.edu.au/music/bellplates/sounds/bellplate-corner4.mp3',
      buzzer: 'http://www.sounds.beachware.com/2illionzayp3may/zwvyaz/BUZZER.mp3'
    };

    $scope.round1 = [
      wordAudio('mineral', 'M04/M0453800.mp3', 'noun', "any of a class of substances occurring in nature, usually comprising inorganic substances, as quartz or feldspar, of definite chemical composition and usually of definite crystal structure, but sometimes also including rocks formed by these substances as well as certain natural products of organic origin, as asphalt or coal."),
      wordAudio('aloha', 'A03/A0344200.mp3', 'noun, interjection', "hello; greetings."),
      wordAudio('coffee', 'C06/C0620300.mp3', 'noun', "a beverage consisting of a decoction or infusion of the roasted ground or crushed seeds (coffee beans) of the two-seeded fruit (coffee berry) of certain coffee trees."),
      wordAudio('mustang', 'M07/M0708700.mp3', 'noun', "a small, hardy horse of the American plains, descended from Spanish stock."),
      wordAudio('parade', 'P00/P0089700.mp3', 'noun', "a large public procession, usually including a marching band and often of a festive nature, held in honor of an anniversary, person, event, etc."),
      wordAudio('kiwi', 'K01/K0134100.mp3', 'noun', "any of several flightless, ratite birds of the genus Apteryx, of New Zealand, allied to the extinct moas."),
      wordAudio('eyebrow', 'E04/E0443100.mp3', 'noun', "the arch or ridge forming the upper part of the orbit of the eye."),
      wordAudio('velcro', 'V00/V0061100.mp3', 'noun', "a brand of fastening tape consisting of opposing pieces of fabric, one with a dense arrangement of tiny nylon hooks and the other with a dense nylon pile, that interlock when pressed together, used as a closure on garments, luggage, etc., in place of buttons, zippers, and the like."),
      wordAudio('random', 'R00/R0056000.mp3', 'adjective', "proceeding, made, or occurring without definite aim, reason, or pattern: the random selection of numbers."),
      wordAudio('summary', 'S11/S1106500.mp3', 'noun', "a comprehensive and usually brief abstract, recapitulation, or compendium of previously stated facts or statements."),
      wordAudio('macaw', 'M00/M0004300.mp3', 'noun', "any of various large, long-tailed parrots, chiefly of the genus Ara, of tropical and subtropical America, noted for their brilliant plumage and harsh voice."),
      wordAudio('variety', 'V00/V0038500.mp3', 'noun', "the state of being varied or diversified: to give variety to a diet."),
      wordAudio('moxie', 'M06/M0650800.mp3', 'noun', "force of character, determination, or nerve: when you've got moxie, you need the clothes to match"),
      wordAudio('jersey', 'J00/J0051000.mp3', 'noun', 'a close-fitting, knitted sweater or shirt.'),
      wordAudio('people', 'P02/P0250900.mp3', 'noun', 'persons indefinitely or collectively'),
      wordAudio('cough', 'C08/C0898800.mp3', 'verb (used without object)', 'to expel air from the lungs suddenly with a harsh noise, often involuntarily.'),
      wordAudio('marlin', 'M01/M0163500.mp3', 'noun', 'any large, saltwater game fish of the genera Makaira and Tetrapterus, having the upper jaw elongated into a spearlike structure.'),
      wordAudio('warning', 'W00/W0041700.mp3', 'noun', 'the act or utterance of one who warns or the existence, appearance, sound, etc., of a thing that warns.'),
      wordAudio('sonar', 'S07/S0718900.mp3', 'noun', 'a method for detecting and locating objects submerged in water by echolocation.'),
      wordAudio('forum', 'F03/F0316200.mp3', 'noun', 'the marketplace or public square of an ancient Roman city, the center of judicial and business affairs and a place of assembly for the people.'),
      wordAudio('silent', 'S05/S0523800.mp3', 'adjective', 'making no sound; quiet; still: a silent motor.'),
      wordAudio('domino', 'D04/D0453100.mp3', 'noun', 'a flat, thumbsized, rectangular block, the face of which is divided into two parts, each either blank or bearing from one to six pips or dots: 28 such pieces form a complete set.'),
      wordAudio('glance', 'G01/G0177500.mp3', 'verb (used without object)', 'to look quickly or briefly.'),
      wordAudio('atomic', 'A07/A0785700.mp3', 'adjective', 'of, pertaining to, resulting from, or using atoms, atomic energy, or atomic bombs: an atomic explosion.'),
      wordAudio('native', 'N00/N0038500.mp3', 'adjective', "being the place or environment in which a person was born or a thing came into being: one's native land.")
    ];
    $scope.round2 = [
      wordAudio('clutch', 'C05/C0582400.mp3', 'verb (used with object)', 'to seize with or as with the hands or claws; snatch: The bird swooped down and clutched its prey with its claws.'),
      wordAudio('polar', 'P05/P0586100.mp3', 'adjective', 'of or relating to the North or South Pole.'),
      wordAudio('field', 'F01/F0126400.mp3', 'noun', 'an expanse of open or cleared ground, especially a piece of land suitable or used for pasture or tillage.'),
      wordAudio('ocean', 'O00/O0026100.mp3', 'noun', "the vast body of salt water that covers almost three fourths of the earth's surface."),
      wordAudio('acre', 'A00/A0095400.mp3', 'noun', 'a common measure of area: in the U.S. and U.K., 1 acre equals 4,840 square yards (4,047 square meters) or 0.405 hectare; 640 acres equals one square mile.'),
      wordAudio('euro', 'E03/E0348100.mp3', 'noun', "the single European currency, which replaced the national currencies of France, Germany, Spain, Italy, Greece, Portugal, Luxembourg, Austria, Finland, the Republic of Ireland, Belgium, and the Netherlands in 2002. Seventeen member states of the European Union now use the euro."),
      wordAudio('wrinkle', 'W02/W0253100.mp3', 'noun', 'a small furrow or crease in the skin, especially of the face, as from aging or frowning.'),
      wordAudio('flattery', 'F02/F0201400.mp3', 'noun', "excessive and insincere praise, especially that given to further one's own interests. his healthy distrust of courtiers' flattery. synonyms:	praise, adulation, compliments, blandishments, honeyed words."),
      wordAudio('blossom', 'B04/B0426500.mp3', 'noun', 'the flower of a plant, especially of one producing an edible fruit.'),
      wordAudio('magma', 'M00/M0040300.mp3', 'noun', "Geology. molten material beneath or within the earth's crust, from which igneous rock is formed."),
      wordAudio('galaxy', 'G00/G0017200.mp3', 'noun', "Astronomy. a large system of stars held together by mutual gravitation and isolated from similar systems by vast regions of space."),
      wordAudio('catalog', 'C02/C0205000.mp3', 'noun', 'a list or record, as of items for sale or courses at a university, systematically arranged and often including descriptive material: a stamp catalog.'),
      wordAudio('lactose', 'L00/L0019100.mp3', 'noun', 'Biochemistry. a disaccharide, C <sub>12</sub> H <sub>22</sub> O <sub>11</sub> , present in milk, that upon hydrolysis yields glucose and galactose.'),
      wordAudio('diploma', 'D03/D0330100.mp3', 'noun', 'a document given by an educational institution conferring a degree on a person or certifying that the person has satisfactorily completed a course of study.'),
      wordAudio('everglades', 'E03/E0364100.mp3', 'noun', 'a swampy and partly forested region in S Florida, mostly S of Lake Okeechobee. Over 5000 sq. mi. (12,950 sq. km).'),
      wordAudio('emerald', 'E01/E0137800.mp3', 'noun', 'a rare variety of beryl that is colored green by chromium and valued as a gem.'),
      wordAudio('atrium', 'A07/A0789400.mp3', 'noun', "Architecture. Also called cavaedium. the main or central room of an ancient Roman house, open to the sky at the center and usually having a pool for the collection of rain water."),
      wordAudio('phrasing', 'P04/P0402500.mp3', 'noun', 'the act of forming phrases.'),
      wordAudio('cyberspace', 'C10/C1082700.mp3', 'noun', 'the realm of electronic communication.'),
      wordAudio('origin', 'O01/O0158700.mp3', 'noun', 'something from which anything arises or is derived; source; fountainhead: to follow a stream to its origin.'),
      wordAudio('parable', 'P00/P0087100.mp3', 'noun', 'a short allegorical story designed to illustrate or teach some truth, religious principle, or moral lesson.'),
      wordAudio('chemistry', 'C03/C0366800.mp3', 'noun', 'the science that deals with the composition and properties of substances and various elementary forms of matter.'),
      wordAudio('swollen', 'S11/S1195200.mp3', 'verb', 'a past participle of swell. (especially of a part of the body) become larger or rounder in size, typically as a result of an accumulation of fluid.'),
      wordAudio('diagonal', 'D02/D0258400.mp3', 'adjective', 'Mathematics. connecting two nonadjacent angles or vertices of a polygon or polyhedron, as a straight line.'),
      wordAudio('fulfilling', 'F04/F0407400.mp3', 'verb (used with object)', "making someone satisfied or happy because of fully developing their character or abilities: a fulfilling and rewarding career")
    ];
    $scope.round3 = [
      wordAudio('hammock', 'H00/H0054400.mp3', 'noun', 'a hanging bed or couch made of canvas, netted cord, or the like, with cords attached to supports at each end.'),
      wordAudio('whiff', 'NEW/NEW16095.mp3', 'noun', 'a slight gust or puff of wind, air, vapor, smoke, or the like: a whiff of fresh air.'),
      wordAudio('mutiny', 'M07/M0712800.mp3', 'noun', 'revolt or rebellion against constituted authority, especially by sailors against their officers.'),
      wordAudio('blossom', 'B04/B0426500.mp3', 'noun', 'the flower of a plant, especially of one producing an edible fruit.'),
      wordAudio('magma', 'M00/M0040300.mp3', 'noun', "Geology. molten material beneath or within the earth's crust, from which igneous rock is formed."),
      wordAudio('snippet', 'S06/S0663800.mp3', 'noun', 'a small piece snipped off; a small bit, scrap, or fragment: an anthology of snippets.'),
      wordAudio('grumbling', 'G03/G0372300.mp3', 'verb (used without object)', 'to murmur or mutter in discontent; complain sullenly.'),
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
    $scope.round4 = [
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
      wordAudio('hodgepodge', 'H03/H0317000.mp3', 'noun', "a heterogeneous mixture; jumble.")
    ];
    $scope.round5 = [
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
      wordAudio('likable', 'L02/L0252200.mp3', 'adjective', "readily or easily liked; pleasing: a likable young man.")
    ];
    $scope.round6 = [
      wordAudio('hinge', 'H02/H0291800.mp3', 'noun', "a jointed device or flexible piece on which a door, gate, shutter, lid, or other attached part turns, swings, or moves."),
      wordAudio('future', 'F04/F0434600.mp3', 'noun', "time that is to be or come hereafter."),
      wordAudio('gusto', 'G04/G0411200.mp3', 'noun', "hearty or keen enjoyment, as in eating or drinking, or in action or speech in general: to dance with gusto."),
      wordAudio("o'clock", 'O00/O0031600.mp3', 'adverb', "of, by, or according to the clock (used in specifying the hour of the day): It is now 4 o'clock."),
      wordAudio('upshot', 'U01/U0148500.mp3', 'noun', "the final issue, the conclusion, or the result: The upshot of the disagreement was a new bylaw."),
      wordAudio('barter', 'B01/B0123900.mp3', 'verb (used without object)', "to trade by exchange of commodities rather than by the use of money."),
      wordAudio('hefty', 'H01/H0159800.mp3', 'adjective', "heavy; weighty: a hefty book."),
      wordAudio('glimmer', 'G01/G0189300.mp3', 'noun', "a faint or unsteady light; gleam."),
      wordAudio('jackpot', 'J00/J0005900.mp3', 'noun', "the chief prize or the cumulative stakes in a game or contest, as in bingo, a quiz contest, or a slot machine."),
      wordAudio('garlic', 'G00/G0054400.mp3', 'noun', "a hardy plant, Allium sativum, of the amaryllis family whose strongly, pungent bulb is used in cookery and medicine."),
      wordAudio('plaza', 'P05/P0537300.mp3', 'noun', "a public square or open space in a city or town."),
      wordAudio('naysayer', 'N00/N0046900.mp3', 'noun', "a person who habitually expresses negative or pessimistic views: Despite a general feeling that things were going well, a few naysayers tried to cast gloom."),
      wordAudio('around', 'A06/A0693200.mp3', 'adverb', "in a circle, ring, or the like; so as to surround a person, group, thing, etc.: The crowd gathered around."),
      wordAudio('splendid', 'S08/S0823800.mp3', 'adjective', "gorgeous; magnificent; sumptuous. Synonyms: luxurious, dazzling, imposing."),
      wordAudio('zinger', 'Z00/Z0028900.mp3', 'noun', "a quick, witty, or pointed remark or retort: During the debate she made a couple of zingers that deflated the opposition."),
      wordAudio('band-Aid', 'B00/B0072100.mp3', 'noun', "a brand of adhesive bandage with a gauze pad in the center, used to cover minor abrasions and cuts."),
      wordAudio('watchdog', 'W00/W0052400.mp3', 'noun', "a dog kept to guard property."),
      wordAudio('dearly', 'D00/D0069700.mp3', 'adjective', "beloved or loved: a dear friend."),
      wordAudio('impostor', 'I00/I0082500.mp3', 'noun', "a person who practices deception under an assumed character, identity, or name."),
      wordAudio('tirade', 'T03/T0320100.mp3', 'noun', "a prolonged outburst of bitter, outspoken denunciation: a tirade against smoking."),
      wordAudio('postpone', 'P06/P0677200.mp3', 'verb (used with object)', "to put off to a later time; defer: He has postponed his departure until tomorrow."),
      wordAudio('coward', 'C09/C0930400.mp3', 'noun', "a person who lacks courage in facing danger, difficulty, opposition, pain, etc.; a timid or easily intimidated person."),
      wordAudio('error', 'E02/E0284800.mp3', 'noun', "a deviation from accuracy or correctness; a mistake, as in action or speech: His speech contained several factual errors."),
      wordAudio('owlishly', 'O02/O0271300.mp3', 'adjective', "resembling or characteristic of an owl: His thick glasses give him an owlish appearance."),
      wordAudio('barrel', 'B01/B0118100.mp3', 'noun', "a cylindrical wooden container with slightly bulging sides made of staves hooped together, and with flat, parallel ends.")
    ];
    $scope.round7 = [
      wordAudio('beagle', 'B01/B0174300.mp3', 'noun', "one of a breed of small hounds having long ears, short legs, and a usually black, tan, and white coat."),
      wordAudio('bawl', 'B01/B0165700.mp3', 'verb (used without object)', "to cry or wail lustily."),
      wordAudio('tomorrow', 'T03/T0357600.mp3', 'noun', "the day following today: Tomorrow is supposed to be sunny."),
      wordAudio('crumb', 'C10/C1011200.mp3', 'noun', "a small particle of bread, cake, etc., that has broken off."),
      wordAudio('dough', 'D04/D0491400.mp3', 'noun', "flour or meal combined with water, milk, etc., in a mass for baking into bread, cake, etc.; paste of bread."),
      wordAudio('rattler', 'R00/R0078600.mp3', 'noun', "a rattlesnake."),
      wordAudio('medley', 'M02/M0260600.mp3', 'noun', "a mixture, especially of heterogeneous elements; hodgepodge; jumble."),
      wordAudio('difficult', 'D02/D0295400.mp3', 'adjective', "not easily or readily done; requiring much labor, skill, or planning to be performed successfully; hard: a difficult job."),
      wordAudio('drench', 'D05/D0526600.mp3', 'verb (used with object)', "to wet thoroughly; soak."),
      wordAudio('bonkers', 'B04/B0488000.mp3', 'adjective', "mentally unbalanced; mad; crazy."),
      wordAudio('seldom', 'S02/S0280100.mp3', 'adverb', "on only a few occasions; rarely; infrequently; not often: We seldom see our old neighbors anymore."),
      wordAudio('fringe', 'F03/F0379100.mp3', 'noun', "a decorative border of thread, cord, or the like, usually hanging loosely from a raveled edge or separate strip."),
      wordAudio('calico', 'C00/C0046600.mp3', 'noun', "a plain-woven cotton cloth printed with a figured pattern, usually on one side."),
      wordAudio('buoyancy', 'B07/B0703700.mp3', 'noun', "the power to float or rise in a fluid; relative lightness.")
    ];
    $scope.words = $scope.round1;

    $scope.checks = [];

    $scope.checkWord = function(text, value, idx) {
      // value = angular.element(document.getElementById("spelling"+idx).text);
      var x = text === value? 1 : 0;
      $scope.checks[idx] = x;
      if(x === 1) {
        angular.element(document.getElementById('ding').play());
      } else {
        angular.element(document.getElementById('buzzer').play());
      }
    };

    $scope.clear = function() {
      $scope.checks = [];
    };

    $scope.play = function(idx) {
      angular.element(document.getElementById('audio-player'+idx).play());
    }
  }
])
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
