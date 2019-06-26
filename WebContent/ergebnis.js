/**
 * 
 */

function spleißen() {
	var myselect = document.getElementById("Spleißenarten");
	if (myselect.options[0].value == "Cis-Spleißen") {
		openpageEukaryotenCis();
	}
	if (myselect.options[1].value == "Trans-Spleißen") {
		openpageEukaryotenTrans();
	}
	if (myselect.options[2].value == "Alternatives Spleißen") {
		openpageEukaryotenAlt();
	}
}

function openpageEukaryotenCis() {
	var s = document.getElementById("text");
	var text = s.value;
	document.getElementById("textBefore").innerHTML = "Originale Text: " + text
			+ "\n";

	var t = document.getElementById("Übertragung");
	var newText = eukaryotischeTranskription(text)
	t.innerHTML = "Nach der Transkription: " + newText;

	var intron = document.getElementById("intron");
	var allIntrons = intronsFinden(newText);
	intron.innerHTML = "Introns sind: " + allIntrons.valueOf();

	var exon = document.getElementById("exon");
	exon.innerHTML = "Exon sind: " + exonsBinden(newText, allIntrons);

	var protein = document.getElementById("Translation");
	protein.innerHTML = "Als Ergebnis übersetzt: "
			+ translation(exonsBinden(newText, allIntrons));

}


function openpageEukaryotenTrans() {
	var s = document.getElementById("text");
	var text = s.value;
	document.getElementById("textBefore").innerHTML = "Originale Text: " + text
			+ "\n";

	var t = document.getElementById("Übertragung");
	var newText = eukaryotischeTranskription(text)
	t.innerHTML = "Nach der Transkription: " + newText;

	var intron = document.getElementById("intron");
	var allIntrons = intronsFinden(newText);
	intron.innerHTML = "Introns sind: " + allIntrons.valueOf();

	var allExons = exonsBindenTrans(text, allIntrons);
	var leader = leaderSequenz(allExons);
	var exon = document.getElementById("exon");
	exon.innerHTML = "Exon sind: " + Transspleißen(leader, allExons);

	var protein = document.getElementById("Translation");
	protein.innerHTML = "Als Ergebnis übersetzt: "
			+ translation(exonsBinden(newText, allIntrons));

}


function openpageEukaryotenAlt() {
	var s = document.getElementById("text");
	var text = s.value;
	document.getElementById("textBefore").innerHTML = "Originale Text: " + text
			+ "\n";

	var t = document.getElementById("Übertragung");
	var newText = eukaryotischeTranskription(text)
	t.innerHTML = "Nach der Transkription: " + newText;

	var intron = document.getElementById("intron");
	var allIntrons = intronsFinden(newText);
	intron.innerHTML = "Introns sind: " + allIntrons.valueOf();

	
	
	var exon = document.getElementById("exon");
	exon.innerHTML = "Exon sind: " + altSpleißen(exonsBindenTrans(newText, allIntrons));

	var protein = document.getElementById("Translation");
	protein.innerHTML = "Als Ergebnis übersetzt: "
			+ translation(exonsBinden(newText, allIntrons));

}

function openpageProkaryoten() {
	var s = document.getElementById("text");
	var text = s.value;
	document.getElementById("textBefore").innerHTML = "Originale Text: " + text
			+ "\n";

	var t = document.getElementById("Übertragung");
	var newText = prokaryotischeTranskription(text)
	t.innerHTML = "Nach der Transkription: " + newText;

	var protein = document.getElementById("Translation");
	protein.innerHTML = "Als Ergebnis übersetzt: " + translation(newText);

}

function prokaryotischeTranskription(dnaStrang) {
	var dnaStrangNew;
	var promotorIndex = prokaryotischePromotor(dnaStrang);
	var terminatorIndex = prokaryotischeTerminator(dnaStrang, promotorIndex);
	var fertigeStrang = "";
	if ((promotorIndex != -1) && (terminatorIndex != -1)) {
		dnaStrangNew = dnaStrang.substring(promotorIndex, terminatorIndex);
		for (var i = 0; i < dnaStrangNew.length; i++) {
			fertigeStrang = fertigeStrang + replace(dnaStrangNew.charAt(i));
		}
		return fertigeStrang;
	} else {
		return "Promotor oder Terminator wurden nicht gefunden!";
	}
}

function prokaryotischePromotor(dnaStrang) {

	var anfangindex;
	var dnaStrangNew = "";
	var consensusSequenceArray1 = searchSubStr(dnaStrang, "TTGACA");
	if (consensusSequenceArray1 > 0) {
		for (var i = 0; i < consensusSequenceArray1.length; i++) {
			var consensusSequence1 = consensusSequenceArray1[i];
			var consensusSequence2 = dnaStrang.search("TATAAT",
					consensusSequence1);
			alert("consensusSequence1 : " + consensusSequence1
					+ "  consensusSequence2: " + consensusSequence2)
			if ((consensusSequence2 > -1)
					&& ((consensusSequence2 - consensusSequence1) >= 20)
					&& ((consensusSequence2 - consensusSequence1) < 23)) {

				dnaStrangNew = dnaStrang.split("TATAAT")[0];

				anfangindex = dnaStrangNew.length;
				return anfangindex + 6;
			} else {
				return -1;
			}
		}
	} else {
		return -1;
	}
}

function prokaryotischeTerminator(dnaStrang, startIndex) {

	var consensusSequenz1 = "GCCGCCAGT";
	var consensusSequenz2 = "TGGCGGCAT";
	var consensusSequenz3 = "TTAA";
	var consensusSequenz1Index = dnaStrang.indexOf(consensusSequenz1,
			startIndex);
	var stoppstelle = -1;
	if (consensusSequenz1Index > -1) {
		var consensusSequenz2Index = dnaStrang.indexOf(consensusSequenz2,
				consensusSequenz1Index);
		if (consensusSequenz2Index > -1) {
			var consensusSequenz3Index = dnaStrang.indexOf(consensusSequenz3,
					consensusSequenz2Index);
			if (consensusSequenz3Index > -1) {
				stoppstelle = consensusSequenz3Index + 3;
				return stoppstelle;
			}
		}
	}
	return -1;
}

function eukaryotischeTranskription(dnaStrang) {
	var dnaStrangN;
	var promotorIndex = eukaryotischePromotor(dnaStrang);
	var fertigeStrang = "";
	if (promotorIndex !== -1) {
		dnaStrangN = eukaryotischeTeminator(dnaStrang, promotorIndex);
		for (var i = 0; i < dnaStrangN.length; i++) {
			fertigeStrang = fertigeStrang + replace(dnaStrangN.charAt(i));
		}
		fertigeStrang = capAndTail(fertigeStrang);
		return fertigeStrang;
	} else {
		return "Fehler";
	}
}

function capAndTail(dnaStrang) {
	var polyadenylierungssignal = "AAUAAA";
	var tailIndex = dnaStrang.search(polyadenylierungssignal);
	var polyA = "";
	if (tailIndex > -1) {
		for (var i = 0; i < 80; i++) {
			polyA = polyA + "A";
		}
		dnaStrang = dnaStrang.substring(0, tailIndex + 6 + 35) + polyA
				+ dnaStrang.substring(tailIndex + 6 + 35, dnaStrang.length);
	}
	return dnaStrang;
}

function eukaryotischePromotor(dnaStrang) {
	var anfangindex;
	var dnaStrangNew;

	if (dnaStrang.search("TATAAT") > 0) {
		dnaStrangNew = dnaStrang.split("TATAAT")[0];
		anfangindex = dnaStrangNew.charAt(dnaStrangNew.length);
		return anfangindex + 6 + 25;
	} else {
		return -1;
	}

}

function eukaryotischeTeminator(dnaStrang, promotorIndex) {

	var terminator = "TTATTT";
	dnaStrang = dnaStrang.substring(promotorIndex);
	var terminatorIndex = dnaStrang.search(terminator);
	if (terminatorIndex !== -1) {
		return dnaStrang.substring(0, (terminatorIndex + 6));
	}
	return "XXX";
}

function replace(nukleosid) {
	var nukleosidnew;
	if (nukleosid == 'A') {
		nukleosidnew = 'U';
	} else if (nukleosid == 'T') {
		nukleosidnew = 'A';
	} else if (nukleosid == 'C') {
		nukleosidnew = 'G';
	} else if (nukleosid == 'G') {
		nukleosidnew = 'C';
	} else {
		nukleosidnew = 'X';
	}
	return nukleosidnew;
}

function searchSubStr(str, subStr) {
	var positions = [];
	var pos = str.indexOf(subStr);
	while (pos > -1) {
		positions.push(pos);
		pos = str.indexOf(subStr, pos + 1);
	}
	return positions;
}
function Transspleißen(leader, exon){
	var leaderArray = [];
	for(var i=0; i>exon.length; i++){
		leaderArray[i] = leader + exon[i];
		alert(leaderArray[i])
	}
	return leaderArray;
}

function leaderSequenz(exon){
	
	var startcodon = "AUG";
	
	for(var i = 0; i < exon.length; i++){
		var lsIndex = exon[i].indexOf(startcodon);
		if(lsIndex > -1){
			
			var ls = exon[i].substring(0,lsIndex);
			
			return ls;
		}else{
			return "startcodon wurde nicht gefunden!"
		}
	}
	
}

function altSpleißen(exon){
	var exonNew = [];
	for(var i=exon.length; i >0 ; i--){
		for(var j = 0; j < exon.length; j++)
		exonNew = exon[i] + exon[j];
	}
	return exonNew;
}

function exonsBindenTrans(text, allIntrons) {
	var i = 0;
	var exon = [];
	
	while (i < allIntrons.length) {
		if (i == 0) {
			var intronIndex = text.search(allIntrons[0]);
			exon[i] = text.substring(0, intronIndex)
					+ text.substring(intronIndex, text.length);
			alert("exon[i]:"+exon[i])
			
		} else if (i == allIntrons.length - 1) {
			var intronIndex = text.search(allIntrons[i]);
			var intronlength = intronIndex + allIntrons[i].length;
			exon[i] = text.substring(intronlength);
			alert("exon[i]:"+exon[i])
			
		} else {
			if (allIntrons.length > 2) {
				var intronIndex = text.search(allIntrons[i]);
				var intronlength = text.search(allIntrons[i - 1])
						+ allIntrons[i - 1].length;
				exon[i] = text.substring(intronlength, intronIndex);
				alert("exon[i]:"+exon[i])
			}
		}
		i++;
	}
	return exon;
}

function exonsBinden(text, allIntrons) {
	var i = 0;
	var exon = "";
	while (i < allIntrons.length) {
		if (i == 0) {
			var intronIndex = text.search(allIntrons[0]);
			exon = exon + text.substring(0, intronIndex)
					+ text.substring(intronIndex, text.length);
		} else if (i == allIntrons.length - 1) {
			var intronIndex = text.search(allIntrons[i]);
			var intronlength = intronIndex + allIntrons[i].length;
			exon = exon + text.substring(intronlength);
		} else {
			if (allIntrons.length > 2) {
				var intronIndex = text.search(allIntrons[i]);
				var intronlength = text.search(allIntrons[i - 1])
						+ allIntrons[i - 1].length;
				exon = exon + text.substring(intronlength, intronIndex);
			}
		}
		i++;
	}
	return exon;
}

function branchPointSearch(text, endIndex) {
	var branchPoint = "A";
	for (var i = (endIndex - 18); i > (endIndex - 40); i--) {
		if (text.charAt(i) == branchPoint) {
			return true;
		}
	}
	return false;
}

function intronsFinden(text) {

	var allintrons = [];
	var i = 0;
	do {
		var anfangIndex = text.search("GU");
		var endIndex = text.search("AG") + 2;
		if (((endIndex - anfangIndex) > 18) && (anfangIndex > -1)
				&& (endIndex > -1)) {
			if (branchPointSearch(text, endIndex) == true) {
				var intron = text.substring(anfangIndex, endIndex);
				allintrons[i] = intron;
				i++;
			}
		}
		text = text.substring(endIndex);
	} while ((endIndex > -1) && (anfangIndex > -1));
	return allintrons;
}

function intronExist(anfangIndex, endIndex) {

	if (anfangIndex === -1 || endIndex === -1) {
		return false;
	} else {
		return true;
	}
}

function translation(text) {
	var startCodon = startcodonFinden(text);
	var aminosäure = '';
	var protein = '';
	if (startCodon > -1) {
		var i = startCodon;
		while (i < (text.length - 2)) {
			var codon = text.charAt(i) + text.charAt(i + 1)
					+ text.charAt(i + 2);
			aminosäure = GenetischeCodeTable(codon);
			if (aminosäure != "Stop") {
				protein += aminosäure;
				i = i + 3;
			} else {
				break;
			}
		}
		return protein;
	}
}

function startcodonFinden(text) {

	var startcodon;
	if (text.search("AUG") > -1) {
		startcodon = text.search("AUG");
		return startcodon;
	} else {
		alert("Startcodon wurde nicht gefunden!");
	}
}

function GenetischeCodeTable(text) {
	var aminosäure = "";
	if ((text === "AUA") || (text === "AUG")) {
		aminosäure = "Met";
	} else if ((text === "UUU") || (text === "UUC")) {
		aminosäure = "Phe";
	} else if ((text === "UUA") || (text === "UUG")) {
		aminosäure = "Leu";
	} else if ((text === "UCU") || (text === "UCC") || (text === "UCA")
			|| (text === "UCG")) {
		aminosäure = "Ser";
	} else if ((text === "UAU") || (text === "UAC")) {
		aminosäure = "Tyr";
	} else if ((text === "UAA") || (text === "UAG")) {
		aminosäure = "Stop";
	} else if ((text === "UGU") || (text === "UGC")) {
		aminosäure = "Cys";
	} else if ((text === "UGA") || (text === "UGG")) {
		aminosäure = "Trp";
	} else if ((text === "CUU") || (text === "CUC") || (text === "CUA")
			|| (text === "CUG")) {
		aminosäure = "Leu";
	} else if ((text === "CCU") || (text === "CCC") || (text === "CCA")
			|| (text === "CCG")) {
		aminosäure = "Pro";
	} else if ((text === "CAA") || (text === "CAG")) {
		aminosäure = "Gln";
	} else if ((text === "UUA") || (text === "UUG")) {
		aminosäure = "His";
	} else if ((text === "CGU") || (text === "CGC") || (text === "CGA")
			|| (text === "CGG")) {
		aminosäure = "Arg";
	} else if ((text === "AUU") || (text === "AUC")) {
		aminosäure = "Lle";
	} else if ((text === "ACU") || (text === "ACC") || (text === "ACA")
			|| (text === "ACG")) {
		aminosäure = "Thr";
	} else if ((text === "AAU") || (text === "AAC")) {
		aminosäure = "Asn";
	} else if ((text === "AAA") || (text === "AAG")) {
		aminosäure = "Lys";
	} else if ((text === "AGU") || (text === "AGC")) {
		aminosäure = "Ser";
	} else if ((text === "AGA") || (text === "AGG")) {
		aminosäure = "Stop";
	} else if ((text === "GUU") || (text === "GUC") || (text === "GUA")
			|| (text === "GUG")) {
		aminosäure = "Val";
	} else if ((text === "GCU") || (text === "GCC") || (text === "GCA")
			|| (text === "GCG")) {
		aminosäure = "Ala";
	} else if ((text === "GAU") || (text === "GAC")) {
		aminosäure = "Asp";
	} else if ((text === "GAA") || (text === "GAG")) {
		aminosäure = "Glu";
	} else if ((text === "GGU") || (text === "GGC") || (text === "GGA")
			|| (text === "GGG")) {
		aminosäure = "Gly";
	} else {
		aminosäure = "Xxx";
	}
	return aminosäure;
}