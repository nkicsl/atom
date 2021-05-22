var fs = require('fs');
var xmlreader = require('xmlreader');
//var Ut = require('./sleep');
var solc = require('solc')

var xmlfile = "./src6000.xml";
var filesrc;
var tips = process.argv[2];

var Content = "0x6060604052604060405190810160405280601081526020017f312e312e312e312053594e5f524543560000000000000000000000000000000081525060009080519060200190610050929190610197565b50604060405190810160405280601281526020017f312e312e312e312c27424c4f434b494e472700000000000000000000000000008152506001908051906020019061009d929190610197565b50604060405190810160405280601081526020017f322e322e322e322053594e5f5245435600000000000000000000000000000000815250600290805190602001906100ea929190610197565b50604060405190810160405280600181526020017f610000000000000000000000000000000000000000000000000000000000000081525060039080519060200190610137929190610197565b50604060405190810160405280600181526020017f620000000000000000000000000000000000000000000000000000000000000081525060049080519060200190610184929190610197565b506000600555341561019257fe5b61023c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101d857805160ff1916838001178555610206565b82800160010185558215610206579182015b828111156102055782518255916020019190600101906101ea565b5b5090506102139190610217565b5090565b61023991905b8082111561023557600081600090555060010161021d565b5090565b90565b6102628061024b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063916adad014610046578063a77241ed14610066575bfe5b341561004e57fe5b6100646004808035906020019091905050610117565b005b341561006e57fe5b610101600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610148565b6040518082815260200191505060405180910390f35b60008114156101265760506000525b60018114156101355760516000525b60028114156101445760526000525b5b50565b600060006005819055508260039080519060200190610168929190610191565b50816004908051906020019061017f929190610191565b50604d60005260055490505b92915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101d257805160ff1916838001178555610200565b82800160010185558215610200579182015b828111156101ff5782518255916020019190600101906101e4565b5b50905061020d9190610211565b5090565b61023391905b8082111561022f576000816000905550600101610217565b5090565b905600a165627a7a72305820af53d59034f259dbb0ab1e524ff1da609656edadbb2f82868b96d305d15477050029";

//policy-format
var Subjects = [];
var Resources = [];
var Actions = [];
var Conditions = [];
var Srcs = [];
var Ops = [];
var Names = [];
var Contents = [];
//get time
var start;

function searchSubStr(str, subStr) {
    var positions = new Array();
    var pos = str.indexOf(subStr);
    while (pos > -1) {
        positions.push(pos);
        pos = str.indexOf(subStr, pos + 1);
    }
    return positions;
}

async function conversion(tips) {
    start = new Date().getTime();
    xmlreader.read(filesrc, function (err, res) {
        if (err) console.log(err);
        else {
            for (i = 0; i < tips; i++) {
                var rule = res.policies.policy.array[i].rule.target;
                Subjects[i] = rule.subject.text();
                Resources[i] = rule.resource.text();
                Actions[i] = rule.action.text();
                Conditions[i] = rule.condition.text();
                var pos = searchSubStr(Conditions[i], '$');
                var Src = new Array();
                for (j = 0; j < pos.length; j++) {
                    if (j == pos.length) {
                        Src.push(Conditions[i].slice(pos[j] + 1).split(' ')[0]);
                    } else {
                        Src.push(Conditions[i].slice(pos[j] + 1, pos[j + 1]).split(' ')[0]);
                    }
                }
                Srcs[i] = Src;
                Names[i] = "Rule" + '_' + i;
                content = Content;
                content.replace(/56/g, "57");
                content.replace(/26/g, "27");
                content.replace(/e5/g, "e6");
                content.replace(/50/g, "51");
                Contents[i] = content;
                console.log("conversion of No.%o contract success!", i + 1);
            }
        }
    })
    current = new Date().getTime();
    fs.appendFile('./conversion.txt', String(current - start) + "\n", function (err) {
        if (err) throw err;
    })
}


function run() {
    fs.readFile(xmlfile, function (err, data) {
        if (err)
            console.log(err);
        else {
            filesrc = data.toString();
            console.log("init over");
            conversion(tips);
        }
    })
}

run();
