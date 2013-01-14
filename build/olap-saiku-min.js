(function e(t){var e;typeof exports!="undefined"?e=exports:e=t.olapSaiku={},e.Connection=function(t){var n=t||{},r=this;olap.Connection.call(this,n),r.url=n.url||window.location.origin+"/"+window.location.pathname.split("/")[1]+"/content/saiku",$.ajax({async:!1,url:r.url+"/session",data:{}}).done(function(e){r.sessionid=e.sessionid,r.username=e.username})},inheritPrototype(e.Connection,olap.Connection),e.Connection.prototype.executeOlapQuery=function(t){var n=this,r="xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,n=e=="x"?t:t&3|8;return n.toString(16)}).toUpperCase();$.ajax({url:n.url+"/"+n.username+"/query/"+r,type:"POST",data:{connection:t.cube.catalog.datasource.DATA_SOURCE_NAME,catalog:t.cube.CATALOG_NAME,schema:t.cube.SCHEMA_NAME,cube:t.cube.DESCRIPTION}}).done(function(e){n.response=e,$.ajax({url:n.url+"/"+n.username+"/query/"+r+"/result/hierarchical",type:"POST",data:{connection:t.cube.catalog.datasource.DATA_SOURCE_NAME,catalog:t.cube.CATALOG_NAME,schema:t.cube.SCHEMA_NAME,cube:t.cube.DESCRIPTION,mdx:t.mdx}}).done(function(e){typeof t.success=="function"&&t.success.call(n,e)})})},e.Connection.prototype.addDataSource=function(n,r){var i=new e.Datasource(n,this);return olap.Connection.prototype.addDataSource.call(this,i),i},e.Connection.prototype.fetchOlapDatasources=function(n){var r=this,i=function(i){var s,o,u,a,f,l,c=[];for(var h=0,p=i.length;h<p;h++){u=i[h],s=u.catalogs[0].schemas;for(a in s){o=s[a],c=[],o.CATALOG_NAME=o.uniqueName,o.DESCRIPTION=o.name,delete o.name,delete o.uniqueName;for(f in o.cubes)l=o.cubes[f],c.push({CUBE_NAME:l.uniqueName,DESCRIPTION:l.name,SCHEMA_NAME:l.schemaName,CATALOG_NAME:l.catalogName});o.cubes=c}u.catalogs=s,ds=new e.Datasource({DATA_SOURCE_DESCRIPTION:u.name||"",DATA_SOURCE_NAME:u.uniqueName||"",catalogs:u.catalogs},r),r.addDataSource.call(r,ds)}n.call(r,r.sources)};$.ajax({url:r.url+"/"+r.username+"/discover/",data:{_:r.sessionid}}).done(i)},e.Datasource=function(t,n){olap.Datasource.call(this,t,n)},inheritPrototype(e.Datasource,olap.Datasource),e.Datasource.prototype.fetchCatalogs=function(){return this.catalogs},e.Datasource.prototype.addCatalog=function(n,r){var i=new e.Catalog(n,this);return olap.Datasource.prototype.addCatalog.call(this,i),i},e.Catalog=function(t,n){olap.Catalog.call(this,t,n)},inheritPrototype(e.Catalog,olap.Catalog),e.Catalog.prototype.addCube=function(n,r){var n=new e.Cube(n,this);return olap.Catalog.prototype.addCube.call(this,n),n},e.Cube=function(t,n){olap.Cube.call(this,t,n)},inheritPrototype(e.Cube,olap.Cube),e.Cube.prototype.fetchDimensions=function(n,r){var i=this,s=function(n){var r,s,o,u,a,f,l,c,h,p,d,v;for(var m=0,g=n.length;m<g;m++){s={DIMENSION_NAME:n[m].name,DIMENSION_UNIQUE_NAME:n[m].uniqueName,DESCRIPTION:n[m].description,CAPTION:n[m].caption,CUBE_NAME:i.CUBE_NAME,SCHEMA_NAME:i.SCHEMA_NAME,CATALOG_NAME:i.CATALOG_NAME,hierarchies:[]},r=new e.Dimension(s,i),u=n[m].hierarchies;for(o in u){a=u[o],f={HIERARCHY_CAPTION:a.caption,HIERARCHY_NAME:a.name,HIERARCHY_UNIQUE_NAME:a.uniqueName,DIMENSION_UNIQUE_NAME:a.dimensionUniqueName,CUBE_NAME:i.CUBE_NAME,SCHEMA_NAME:i.SCHEMA_NAME,CATALOG_NAME:i.CATALOG_NAME,levels:[]},d=new e.Hierarchy(f,r),l=a.levels;for(p in l)c=l[p],h={LEVEL_UNIQUE_NAME:c.uniqueName,LEVEL_NAME:c.name,LEVEL_CAPTION:c.caption,HIERARCHY_UNIQUE_NAME:c.hierarchyUniqueName,DIMENSION_UNIQUE_NAME:c.dimensionUniqueName,CUBE_NAME:i.CUBE_NAME,SCHEMA_NAME:i.SCHEMA_NAME,CATALOG_NAME:i.CATALOG_NAME},v=new e.Level(h,d),d.addLevel(v);r.addHierarchy(d)}i.addDimension(r)}};$.ajax({url:i.catalog.datasource.connection.url+"/"+i.username+"/discover/"+i.catalog.datasource.DATA_SOURCE_NAME+"/"+i.CATALOG_NAME+"/"+i.SCHEMA_NAME+"/"+i.DESCRIPTION+"/dimensions",data:{_:i.sessionid},async:!1,success:s})},e.Cube.prototype.fetchMeasures=function(t){var n=this,r=function(r){for(var i=0,s=r.length,o=null;i<s;i++)o={MEASURE_NAME:r[i].name,MEASURE_UNIQUE_NAME:r[i].uniqueName,DESCRIPTION:r[i].description,CAPTION:r[i].caption,CUBE_NAME:n.CUBE_NAME,SCHEMA_NAME:n.SCHEMA_NAME,CATALOG_NAME:n.CATALOG_NAME},n.addMeasure(new olap.Measure(o,n),t)};$.ajax({url:n.catalog.datasource.connection.url+"/"+n.username+"/discover/"+n.catalog.datasource.DATA_SOURCE_NAME+"/"+n.CATALOG_NAME+"/"+n.SCHEMA_NAME+"/"+n.DESCRIPTION+"/measures",data:{_:n.sessionid},async:!1,success:r})},e.Cube.prototype.addDimension=function(n,r){var i=new e.Dimension(n,this);return olap.Cube.prototype.addDimension.call(this,i),i},e.Dimension=function(t,n){olap.Dimension.call(this,t,n)},inheritPrototype(e.Dimension,olap.Dimension),e.Dimension.prototype.addHierarchy=function(n,r){var i=new e.Hierarchy(n,this);return olap.Dimension.prototype.addHierarchy.call(this,n),i},e.Hierarchy=function(t,n){olap.Hierarchy.call(this,t,n)},inheritPrototype(e.Hierarchy,olap.Hierarchy),e.Hierarchy.prototype.addLevel=function(n,r){var i=new e.Level(n,this);return olap.Hierarchy.prototype.addLevel.call(this,i),i},e.Level=function(t,n){olap.Level.call(this,t,n)},inheritPrototype(e.Level,olap.Level),e.Level.prototype.addMember=function(n,r){var i=new e.Member(n,this);return olap.Level.prototype.addMember.call(this,i),i},e.Level.prototype.fetchMembers=function(n){var r=this,i=function(i){console.debug("got something"),console.debug(i);for(var s=0,o=i.length,u=null;s<o;s++)u={MEMBER_NAME:i[s].name,MEMBER_CAPTION:i[s].caption,DESCRIPTION:i[s].description,MEMBER_UNIQUE_NAME:i[s].uniqueName,LEVEL_UNIQUE_NAME:r.LEVEL_UNIQUE_NAME,HIERARCHY_UNIQUE_NAME:r.HIERARCHY_UNIQUE_NAME,DIMENSION_UNIQUE_NAME:r.DIMENSION_UNIQUE_NAME,CUBE_NAME:r.CUBE_NAME,SCHEMA_NAME:r.SCHEMA_NAME,CATALOG_NAME:r.CATALOG_NAME},r.addMember(new e.Member(u,r),n)},s=r.hierarchy.dimension.cube.catalog.datasource.connection;return $.ajax({url:r.hierarchy.dimension.cube.catalog.datasource.connection.url+"/"+r.username+"/discover/"+r.hierarchy.dimension.cube.catalog.datasource.DATA_SOURCE_NAME+"/"+r.CATALOG_NAME+"/"+r.SCHEMA_NAME+"/"+r.hierarchy.dimension.cube.DESCRIPTION+"/dimensions/"+r.hierarchy.dimension.DIMENSION_NAME+"/hierarchies/"+r.hierarchy.getName()+"/levels/"+r.LEVEL_NAME,data:{_:r.sessionid},async:!1,success:i}),this.members},e.Member=function(t,n){olap.Member.call(this,t,n)},inheritPrototype(e.Member,olap.Member),e.Query=function(t,n,r,i){olap.Query.call(this,t,n),this.connection=r||{},this.catalog=i||{}},inheritPrototype(e.Query,olap.Query),e.Query.prototype.execute=function(t){var n=this,r={},i,s,o,u,a,f;i=this.getMDX(),o=this.connection.executeOlapQuery({mdx:i,catalog:this.catalog,success:function(e){typeof t=="function"&&(t.call(this,e),delete e)}})}})(this);