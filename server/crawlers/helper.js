
'use strict';
const _ = require('lodash');


let TAGS = [

    { rx: /\W(psychology)\W/gi, label: 'psychology' },
    { rx: /\W(gcse)\W/gi, label: 'gcse' },
    { rx: /\W(history)\W/gi, label: 'history' },
    { rx: /\W(finance|financial)\W/gi, label: 'finance' },
    { rx: /\W(art|Art)\W/gi, label: 'art' },
    { rx: /\W(fte)\W/gi, label: 'FTE' },
    { rx: /\W(maths|mathematics|math)\W/gi, label: 'maths' },
    { rx: /\W(music|Music)\W/gi, label: 'music' },
    { rx: /\W(culture)\W/gi, label: 'culture' },
    { rx: /\W(nursery|childcare)\W/gi, label: 'nursery' },
    { rx: /\W(nqt)\W/gi, label: 'NQT' },
    { rx: /\W(science)\W/gi, label: 'science' },
    { rx: /\W(technology|technologies)\W/gi, label: 'technology' },
    { rx: /\W(ks1)\W/gi, label: 'KS1' },
    { rx: /\W(ks2)\W/gi, label: 'KS2' },
    { rx: /\W(ks3)\W/gi, label: 'KS3' },
    { rx: /\W(ks4)\W/gi, label: 'KS4' },
    { rx: /\W(ks5)\W/gi, label: 'KS5' },
    { rx: /\W(college)\W/gi, label: 'college' },

    { rx: /\W(assistant)\W/gi, label: 'assistant' },
    { rx: /\W(advertising)\W/gi, label: 'advertising' },
    { rx: /\W(psychology|psychologist)\W/gi, label: 'psychology' },
    { rx: /\W(academy)\W/gi, label: 'academy' },


    { rx: /\W(training)\W/gi, label: 'training' },
    { rx: /\W(pedagogy)\W/gi, label: 'pedagogy' },
    { rx: /\W(philosophy)\W/gi, label: 'philosophy' },
    { rx: /\W(slt)\W/gi, label: 'SLT' },
    { rx: /\W(computing)\W/gi, label: 'computing' },

    { rx: /\W(french)\W/gi, label: 'french' },
    { rx: /\W(oct)\W/gi, label: 'OCT' },
    { rx: /\W(esl|ESL)\W/gi, label: 'ESL' },
    { rx: /\W(efl|EFL)\W/gi, label: 'EFL' },
    { rx: /\W(tefl|TEFL)\W/gi, label: 'TEFL' },
    { rx: /\W(tesol)\W/gi, label: 'TESOL' },
    { rx: /\W(English|english)\W/gi, label: 'english' },
    { rx: /\W(german)\W/gi, label: 'german' },

    { rx: /\W(economics|business|Business)\W/gi, label: 'economics' },
    { rx: /\W(bsl)\W/gi, label: 'BSL' },

    { rx: /\W(law)\W/gi, label: 'law' },
    { rx: /\W(physics)\W/gi, label: 'physics' },
    { rx: /\W(chemistry|Chemistry)\W/gi, label: 'chemistry' },
    { rx: /\W(biology)\W/gi, label: 'biology' },
    { rx: /\W(language)\W/gi, label: 'language' },

    { rx: /\W(mandarin|chinese|Chinese)\W/gi, label: 'mandarin' },

    { rx: /\W(coordinator)\W/gi, label: 'coordinator' },
    { rx: /\W(adult)\W/gi, label: 'adult' },
    { rx: /\W(pe teacher|physical education)\W/gi, label: 'pe teacher' },
    { rx: /\W(theology)\W/gi, label: 'theology' },
    { rx: /\W(teacher|teachers|teaching)\W/gi, label: 'teacher' },
    { rx: /\W(high school)\W/gi, label: 'high school' },
    { rx: /\W(intern|internship)\W/gi, label: 'intern' },
    { rx: /\W(director)\W/gi, label: 'director' },
    { rx: /\W(social studies)\W/gi, label: 'social studies' },
    { rx: /\W(middle school)\W/gi, label: 'middle school' },
    { rx: /\W(elementary school|elementary|Elementary)\W/gi, label: 'elementary school' },
    { rx: /\W(secondary school|secondary)\W/gi, label: 'secondary school' },
    { rx: /\W(early childhood)\W/gi, label: 'early childhood' },
    { rx: /\W(classroom teacher|classroom)\W/gi, label: 'classroom teacher' },
    { rx: /\W(substitute)\W/gi, label: 'substitute' },
    { rx: /\W(grade 3|grade 4| primary)\W/gi, label: 'primary' },
    { rx: /\W(primary|primary teacher)\W/gi, label: 'primary' },
    { rx: /\W(kindergarten)\W/gi, label: 'kindergarten' },
    { rx: /\W(university|University)\W/gi, label: 'university' },

    { rx: /\W(online|Online|remote)\W/gi, label: 'remote' },
    { rx: /\W(tutoring)\W/gi, label: 'tutoring' },
    { rx: /\W(mentoring)\W/gi, label: 'mentoring' },
    { rx: /\W(volunteer|volunteers)\W/gi, label: 'volunteer' },
    { rx: /\W(full time|Full Time|full-time)\W/gi, label: 'full time' },
    { rx: /\W(hourly contract|hourly)\W/gi, label: 'hourly contract' },
    { rx: /\W(Term Contract)\W/gi, label: 'Term Contract' },

];


module.exports = () => {
    function getTags (text) {
        var tags = _.reduce(TAGS, function (tags, tag) {
            var count = 0;
            var result;

            while ((result = tag.rx.exec(text)))
                count += 1;

            if (count > 0)
                tags.push({ label: tag.label, count: count });

            return tags;
        }, []);

        return _.map(_.sortBy(tags, 'count'), 'label');
    }

    //expose public APIs
    return { getTags: getTags };







  let countries = [
        { rx: /\W(Afghanistan)\W/gi, label: 'Afghanistan' },
        { rx: /\W(Albania)\W/gi, label: 'Albania' },
        { rx: /\W(Taiwan)\W/gi, label: 'Taiwan' }

    ];


























    // regex expressions to match new line etc.


    function replaceString(inputString) {
        return inputString.replace(/(?:\\[rnt]|[\r\n\t\s]+)+/g, "");
    }


    function trimString(inputString) {
        return inputString.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').replace(/(?:\\[rnt]|[\r\n\t]+)+/g, "");
    }


    function replaceRtn(inputString) {
        return inputString.replace(/(?:\\[rnt]|[\r\n\t\s]+)+/g, "");
    }





};




