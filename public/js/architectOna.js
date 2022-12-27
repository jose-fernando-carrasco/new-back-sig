function getActor(diagrama, i) {
    var actor = `<Row>
    <Column name="Object_ID" value="${i}" />
    <Column name="Object_Type" value="Actor" />
    <Column name="Diagram_ID" value="0" />
    <Column name="Name" value="${diagrama.attrs.subtitulo.text}" />
    <Column name="Author" value="user" />
    <Column name="Version" value="1.0" />
    <Column name="Package_ID" value="9" />
    <Column name="NType" value="0" />
    <Column name="Complexity" value="1" />
    <Column name="Effort" value="0" />
    <Column name="Backcolor" value="-1" />
    <Column name="BorderStyle" value="0" />
    <Column name="BorderWidth" value="-1" />
    <Column name="Fontcolor" value="-1" />
    <Column name="Bordercolor" value="-1" />
    <Column name="CreatedDate" value="2022-12-06 18:32:30" />
    <Column name="ModifiedDate" value="2022-12-06 18:32:30" />
    <Column name="Status" value="Proposed" />
    <Column name="Abstract" value="0" />
    <Column name="Tagged" value="0" />
    <Column name="GenType" value="&lt;none&gt;" />
    <Column name="Phase" value="1.0" />
    <Column name="Scope" value="Public" />
    <Column name="Classifier" value="0" />
    <Column name="ea_guid" value="{${diagrama.id}}" />
    <Column name="ParentID" value="0" />
    <Column name="IsRoot" value="FALSE" />
    <Column name="IsLeaf" value="FALSE" />
    <Column name="IsSpec" value="FALSE" />
    <Column name="IsActive" value="FALSE" />
    <Extension Package_ID="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
</Row>`;
    return actor;
}

function getPos(diagrama, i) {
    var pos = `<Row>
<Column name="Diagram_ID" value="4" />
<Column name="Object_ID" value="${i}" />
<Column name="RectTop" value="-${diagrama.position.y}" />
<Column name="RectLeft" value="${diagrama.position.x}" />
<Column name="RectRight" value="${diagrama.position.x+diagrama.size.width}" />
<Column name="RectBottom" value="-${diagrama.position.y+diagrama.size.height}" />
<Column name="Sequence" value="${i}" />
<Column name="ObjectStyle" value="DUID=24BC3ECB;" />
<Column name="Instance_ID" value="${i}" />
<Extension Diagram_ID="{76BF9811-7FD1-421a-B278-EEA299B03905}" Object_ID="{${diagrama.id}}" />
</Row>`;
    return pos;
}

function getEnlace(diagrama, i) {
    var title = '';
    if (diagrama.labels.length > 0)
        title = diagrama.labels[0].attrs.text.text;

    var enla = `<Row>
<Column name="Connector_ID" value="${i}" />
<Column name="Name" value="${title}" />
<Column name="Direction" value="Source -&gt; Destination" />
<Column name="Connector_Type" value="Realisation" />
<Column name="SourceAccess" value="Public" />
<Column name="DestAccess" value="Public" />
<Column name="SourceContainment" value="Unspecified" />
<Column name="SourceIsAggregate" value="0" />
<Column name="SourceIsOrdered" value="0" />
<Column name="DestContainment" value="Unspecified" />
<Column name="DestIsAggregate" value="0" />
<Column name="DestIsOrdered" value="0" />
<Column name="Start_Object_ID" value="3" />
<Column name="End_Object_ID" value="2" />
<Column name="Start_Edge" value="0" />
<Column name="End_Edge" value="0" />
<Column name="PtStartX" value="0" />
<Column name="PtStartY" value="0" />
<Column name="PtEndX" value="0" />
<Column name="PtEndY" value="0" />
<Column name="SeqNo" value="0" />
<Column name="HeadStyle" value="0" />
<Column name="LineStyle" value="0" />
<Column name="RouteStyle" value="3" />
<Column name="IsBold" value="0" />
<Column name="LineColor" value="-1" />
<Column name="PDATA5" value="SX=0;SY=0;EX=0;EY=0;" />
<Column name="DiagramID" value="0" />
<Column name="ea_guid" value="{${diagrama.id}}" />
<Column name="SourceIsNavigable" value="FALSE" />
<Column name="DestIsNavigable" value="TRUE" />
<Column name="IsRoot" value="FALSE" />
<Column name="IsLeaf" value="FALSE" />
<Column name="IsSpec" value="FALSE" />
<Column name="SourceChangeable" value="none" />
<Column name="DestChangeable" value="none" />
<Column name="SourceTS" value="instance" />
<Column name="DestTS" value="instance" />
<Column name="IsSignal" value="FALSE" />
<Column name="IsStimulus" value="FALSE" />
<Column name="Target2" value="3801168" />
<Column name="SourceStyle" value="Union=0;Derived=0;AllowDuplicates=0;Owned=0;Navigable=Non-Navigable;" />
<Column name="DestStyle" value="Union=0;Derived=0;AllowDuplicates=0;Owned=0;Navigable=Navigable;" />
<Extension Start_Object_ID="{${diagrama.source.id}}" End_Object_ID="{${diagrama.target.id}}" />
</Row>`;
    return enla;
}


function getBun(diagrama, i) {
    var bun = `<Row>
<Column name="Object_ID" value="${i}" />
<Column name="Object_Type" value="Boundary" />
<Column name="Diagram_ID" value="0" />
<Column name="Author" value="o�a" />
<Column name="Version" value="1.0" />
<Column name="Package_ID" value="14" />
<Column name="NType" value="0" />
<Column name="Complexity" value="1" />
<Column name="Effort" value="0" />
<Column name="Backcolor" value="-1" />
<Column name="BorderStyle" value="3" />
<Column name="BorderWidth" value="-1" />
<Column name="Fontcolor" value="-1" />
<Column name="Bordercolor" value="-1" />
<Column name="CreatedDate" value="2022-12-06 21:39:59" />
<Column name="ModifiedDate" value="2022-12-06 21:39:59" />
<Column name="Status" value="Proposed" />
<Column name="Abstract" value="0" />
<Column name="Tagged" value="0" />
<Column name="PDATA1" value="1" />
<Column name="PDATA2" value="1" />
<Column name="PDATA3" value="0" />
<Column name="GenType" value="&lt;none&gt;" />
<Column name="Phase" value="1.0" />
<Column name="Scope" value="Public" />
<Column name="Classifier" value="0" />
<Column name="ea_guid" value="{${diagrama.id}}" />
<Column name="ParentID" value="0" />
<Column name="IsRoot" value="FALSE" />
<Column name="IsLeaf" value="FALSE" />
<Column name="IsSpec" value="FALSE" />
<Column name="IsActive" value="FALSE" />
<Extension Package_ID="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
</Row>`;
    return bun;
}


function getRectangulo(diagrama, i) {
    var rectangulo = `<Row>
    <Column name="Object_ID" value="${i}" />
    <Column name="Object_Type" value="Object" />
    <Column name="Diagram_ID" value="0" />
    <Column name="Name" value="${diagrama.attrs.subtitulo.text}" />
    <Column name="Author" value="o�a" />
    <Column name="Version" value="1.0" />
    <Column name="Package_ID" value="14" />
    <Column name="NType" value="0" />
    <Column name="Complexity" value="1" />
    <Column name="Effort" value="0" />
    <Column name="Backcolor" value="-1" />
    <Column name="BorderStyle" value="0" />
    <Column name="BorderWidth" value="-1" />
    <Column name="Fontcolor" value="-1" />
    <Column name="Bordercolor" value="-1" />
    <Column name="CreatedDate" value="2022-12-07 00:51:54" />
    <Column name="ModifiedDate" value="2022-12-07 00:51:54" />
    <Column name="Status" value="Proposed" />
    <Column name="Abstract" value="0" />
    <Column name="Tagged" value="0" />
    <Column name="GenType" value="Java" />
    <Column name="Phase" value="1.0" />
    <Column name="Scope" value="Public" />
    <Column name="Classifier" value="0" />
    <Column name="ea_guid" value="{${diagrama.id}}" />
    <Column name="ParentID" value="0" />
    <Column name="IsRoot" value="FALSE" />
    <Column name="IsLeaf" value="FALSE" />
    <Column name="IsSpec" value="FALSE" />
    <Column name="IsActive" value="FALSE" />
    <Extension Package_ID="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
</Row>`;
    return rectangulo;
}


function getDB(diagrama, i) {
    var DBase = `<Row>
    <Column name="Object_ID" value="${i}" />
    <Column name="Object_Type" value="CollaborationOccurrence" />
    <Column name="Diagram_ID" value="0" />
    <Column name="Name" value="${diagrama.attrs.subtitulo.text}" />
    <Column name="Author" value="o�a" />
    <Column name="Version" value="1.0" />
    <Column name="Package_ID" value="16" />
    <Column name="NType" value="0" />
    <Column name="Complexity" value="1" />
    <Column name="Effort" value="0" />
    <Column name="Backcolor" value="-1" />
    <Column name="BorderStyle" value="0" />
    <Column name="BorderWidth" value="-1" />
    <Column name="Fontcolor" value="-1" />
    <Column name="Bordercolor" value="-1" />
    <Column name="CreatedDate" value="2022-12-07 01:09:52" />
    <Column name="ModifiedDate" value="2022-12-07 01:09:52" />
    <Column name="Status" value="Proposed" />
    <Column name="Abstract" value="0" />
    <Column name="Tagged" value="0" />
    <Column name="GenType" value="&lt;none&gt;" />
    <Column name="Phase" value="1.0" />
    <Column name="Scope" value="Public" />
    <Column name="Classifier" value="0" />
    <Column name="ea_guid" value="{${diagrama.id}}" />
    <Column name="ParentID" value="0" />
    <Column name="IsRoot" value="FALSE" />
    <Column name="IsLeaf" value="FALSE" />
    <Column name="IsSpec" value="FALSE" />
    <Column name="IsActive" value="FALSE" />
    <Extension Package_ID="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
</Row>`;
    return DBase;
}

function getBase(figuritas, conectores, posi) {
    var Base = `<?xml version="1.0" encoding="windows-1252"?>
<Package name="Package1" guid="{CCC94095-4808-4d03-9C87-5975BBED25CB}">
<Table name="t_package">
    <Row>
        <Column name="Package_ID" value="9" />
        <Column name="Name" value="Package1" />
        <Column name="Parent_ID" value="7" />
        <Column name="CreatedDate" value="2022-12-06 18:31:39" />
        <Column name="ModifiedDate" value="2022-12-06 18:31:39" />
        <Column name="ea_guid" value="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
        <Column name="IsControlled" value="FALSE" />
        <Column name="Version" value="1.0" />
        <Column name="Protected" value="FALSE" />
        <Column name="UseDTD" value="FALSE" />
        <Column name="LogXML" value="FALSE" />
        <Column name="PackageFlags" value="isModel=1;VICON=3;" />
        <Extension />
    </Row>
</Table>
<Table name="t_object">
    <Row>
        <Column name="Object_ID" value="14" />
        <Column name="Object_Type" value="Package" />
        <Column name="Diagram_ID" value="0" />
        <Column name="Name" value="Package1" />
        <Column name="Author" value="user" />
        <Column name="Version" value="1.0" />
        <Column name="Package_ID" value="7" />
        <Column name="NType" value="0" />
        <Column name="Complexity" value="1" />
        <Column name="Effort" value="0" />
        <Column name="Backcolor" value="-1" />
        <Column name="BorderStyle" value="0" />
        <Column name="BorderWidth" value="-1" />
        <Column name="Fontcolor" value="-1" />
        <Column name="Bordercolor" value="-1" />
        <Column name="CreatedDate" value="2022-12-06 18:31:39" />
        <Column name="ModifiedDate" value="2022-12-06 18:31:39" />
        <Column name="Status" value="Proposed" />
        <Column name="Abstract" value="0" />
        <Column name="Tagged" value="0" />
        <Column name="PDATA1" value="9" />
        <Column name="GenType" value="Java" />
        <Column name="Phase" value="1.0" />
        <Column name="Scope" value="Public" />
        <Column name="Classifier" value="0" />
        <Column name="ea_guid" value="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
        <Column name="ParentID" value="0" />
        <Column name="IsRoot" value="FALSE" />
        <Column name="IsLeaf" value="FALSE" />
        <Column name="IsSpec" value="FALSE" />
        <Column name="IsActive" value="FALSE" />
        <Extension PDATA1="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
    </Row>
    ${figuritas}
</Table>
<Table name="t_connector">
    ${conectores}
</Table>
<Table name="t_diagram">
    <Row>
        <Column name="Diagram_ID" value="4" />
        <Column name="Package_ID" value="9" />
        <Column name="ParentID" value="0" />
        <Column name="Diagram_Type" value="Object" />
        <Column name="Name" value="Package1" />
        <Column name="Version" value="1.0" />
        <Column name="Author" value="user" />
        <Column name="ShowDetails" value="0" />
        <Column name="AttPub" value="TRUE" />
        <Column name="AttPri" value="TRUE" />
        <Column name="AttPro" value="TRUE" />
        <Column name="Orientation" value="P" />
        <Column name="cx" value="803" />
        <Column name="cy" value="1146" />
        <Column name="Scale" value="100" />
        <Column name="CreatedDate" value="2022-12-06 18:31:41" />
        <Column name="ModifiedDate" value="2022-12-06 18:32:30" />
        <Column name="ShowForeign" value="TRUE" />
        <Column name="ShowBorder" value="TRUE" />
        <Column name="ShowPackageContents" value="TRUE" />
        <Column name="PDATA" value="HideRel=0;ShowTags=0;ShowReqs=0;ShowCons=0;OpParams=1;ShowSN=0;ScalePI=0;PPgs.cx=0;PPgs.cy=0;PSize=9;ShowIcons=1;SuppCN=0;HideProps=0;HideParents=0;UseAlias=0;HideAtts=0;HideOps=0;HideStereo=0;HideEStereo=0;ShowRec=1;ShowRes=0;ShowShape=1;FormName=;" />
        <Column name="Locked" value="FALSE" />
        <Column name="ea_guid" value="{76BF9811-7FD1-421a-B278-EEA299B03905}" />
        <Column name="Swimlanes" value="locked=false;orientation=0;width=0;inbar=false;names=false;color=-1;bold=false;fcol=0;tcol=-1;ofCol=-1;ufCol=-1;hl=1;ufh=0;hh=0;cls=0;bw=0;hli=0;" />
        <Column name="StyleEx" value="ExcludeRTF=0;DocAll=0;HideQuals=0;AttPkg=1;ShowTests=0;ShowMaint=0;SuppressFOC=1;MatrixActive=0;SwimlanesActive=1;KanbanActive=0;MatrixLineWidth=1;MatrixLineClr=0;MatrixLocked=0;TConnectorNotation=UML 2.1;TExplicitNavigability=0;AdvancedElementProps=1;AdvancedFeatureProps=1;AdvancedConnectorProps=1;m_bElementClassifier=1;SPT=1;MDGDgm=;STBLDgm=;ShowNotes=0;VisibleAttributeDetail=0;ShowOpRetType=1;SuppressBrackets=0;SuppConnectorLabels=0;PrintPageHeadFoot=0;ShowAsList=0;SuppressedCompartments=;Theme=:119;SaveTag=1BA847CC;" />
        <Extension Package_ID="{CCC94095-4808-4d03-9C87-5975BBED25CB}" />
    </Row>
</Table>
<Table name="t_diagramobjects">
    ${posi}
</Table>
</Package>`;
    return Base;
}