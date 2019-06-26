<%@ page language="java"
	import="java.util.*, java.util.ArrayList,java.util.List"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<!DOCTYPE html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>start</title>
<script src="ergebnis.js"></script>
</head>
<body>

	<div style="width:  100%; height:  30%">RNA-Spleißen</div>
	<div style="width: 100%; height: 70%">
	
		<table>
			<tr>
				<td>Text</td>
				<td><input type="text" id="text" name="textEingabe"></td>
			</tr>
			<tr>
				<td>Spleißenarten</td>
				<td><select id="Spleißenarten" name="SpleißenAuswahl">
						<option value="Cis-Spleißen">Cis-Spleißen</option>
						<option value="Trans-Spleißen">Trans-Spleißen</option>
						<option value="Alternatives Spleißen">Alternatives Spleißen</option>
				</select></td>
			</tr>
			<tr>
				<td><input type="button" id="prokaryoten" value="prokaryoten" onclick="openpageProkaryoten()"/></td>
				<td><input type="button" id="eukaryoten" value="eukaryoten" onclick="spleißen()"/></td>
			</tr>
		</table>

			<ol>
				<li id="textBefore"></li>
				<li id="Übertragung"></li>
				<li id="intron"></li>
				<li id="exon"></li>
				<li id="Translation"></li>
			</ol>

	</div>
</body>
</html>