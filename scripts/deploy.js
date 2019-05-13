const cp = require("child_process"),
      path = require("path"),
      fs = require("fs"),
      process = require("process");

const inspect = require("util").inspect;

const version = require("../src/lib/version");

const buildDir = "../build",
      srcDir = "../docs";

var buildPath = path.resolve(__dirname, buildDir, "daysTillGrad"),
    srcPath = path.resolve(__dirname, srcDir);

function execCommand(process, args, cwd, verbose = false, writeOut = false,
    outFile)
{
  var p = cp.spawnSync(process, args,
  {
    cwd: cwd,
    encoding: "utf8"
  });

  if(verbose)
  {
    var lines = p.stdout.split(/(\r?\n)/g);
    console.log(lines.join(""));
    lines = p.stderr.split(/(\r?\n)/g);
    console.log(lines.join(""));
  }

  if(writeOut)
  {
    fs.writeFileSync(path.resolve(buildPath, outFile),
        p.stdout.split(/(\r?\n)/g).join(""));
  }

  if(p.status != 0)
    return false;
}

function __readDirRecursive(dPath)
{
  var ret = [],
      paths;

  paths = fs.readdirSync(dPath);

  for(var i = 0; i < paths.length; i++)
  {
    var tPath = path.resolve(dPath, paths[i]);

    try
    {
      var stats = fs.statSync(tPath);

      if(stats.isDirectory())
      {
        ret = [...ret, ...__readDirRecursive(tPath)];
      }
      else
        ret.push(tPath);
    }
    catch(e) {}
  }

  return ret;
}

function __isDirectory(dPath)
{
  try
  {
    var stats = fs.statSync(dPath);

    if(!stats.isDirectory())
      return false;
  }
  catch (e)
  {
    return false;
  }

  return true;
}

function __isFile(dPath)
{
  try
  {
    var stats = fs.statSync(dPath);

    if(!stats.isFile())
      return false;
  }
  catch (e)
  {
    return false;
  }

  return true;
}

function copyFilesRecursive(oPath, dPath)
{
  if(!__isDirectory(oPath) || !__isDirectory(dPath))
    return false;

  var oPaths = __readDirRecursive(oPath),
      dPaths = [];

  for(var i = 0; i < oPaths.length; i++)
    dPaths.push(oPaths[i].replace(oPath, dPath));

  for(var i = 0; i < dPaths.length; i++)
  {
    // Check if parent directory exists. If not, create it
    var dPathParent = path.resolve(dPaths[i], "..");
    if(dPathParent != dPath && !__isDirectory(dPathParent))
    {
      if(__isFile(dPathParent))
        fs.copyFileSync(dPathParent, dPathParent + ".old");

      fs.mkdirSync(dPathParent, { recursive: true });
    }

    fs.copyFileSync(oPaths[i], dPaths[i]);
  }

  return true;
}

console.log("Checking build directory...");
try
{
  var stat = fs.statSync(buildPath);

  if(stat.isFile())
  {
    fs.copyFileSync(buildPath, buildPath + ".old");
    fs.mkdirSync(buildPath, { recursive: true });
  }
}
catch(e)
{
  fs.mkdirSync(buildPath, { recursive: true });
}

console.log("Copying source files...");
copyFilesRecursive(srcPath, buildPath);

console.log("Building zip archive...");
execCommand("zip",
    ["-r", "../daysTillGrad-" + version.getVersion() + ".zip", "."], buildPath);

console.log("Calculating zip archive hash...");
execCommand("shasum",
    ["-a", 256, "../daysTillGrad-" + version.getVersion() + ".zip"], buildPath,
    false, true, "../daysTillGrad-" + version.getVersion() + ".zip.sha256");

console.log("Building tar.gz archive...");
execCommand("tar",
    ["-zcvf", "../daysTillGrad-" + version.getVersion() + ".tar.gz", "."],
    buildPath);

console.log("Calculating tar.gz archive hash...");
execCommand("shasum",
    ["-a", 256, "../daysTillGrad-" + version.getVersion() + ".tar.gz"],
    buildPath, false, true,
    "../daysTillGrad-" + version.getVersion() + ".tar.gz.sha256");

console.log("Building tar.bz2 archive...");
execCommand("tar",
    ["-zcvf", "../daysTillGrad-" + version.getVersion() + ".tar.bz2", "."],
    buildPath);

console.log("Calculating tar.bz2 archive hash...");
execCommand("shasum",
    ["-a", 256, "../daysTillGrad-" + version.getVersion() + ".tar.bz2"],
    buildPath, false, true,
    "../daysTillGrad-" + version.getVersion() + ".tar.bz2.sha256");

console.log("Creating DMG archive...");
execCommand("hdiutil",
    ["create", "-format", "UDZO", "-srcfolder", ".",
    "../daysTillGrad-" + version.getVersion() + ".dmg"], buildPath);

console.log("Calculating DMG archive hash...");
execCommand("shasum",
    ["-a", 256, "../daysTillGrad-" + version.getVersion() + ".dmg"],
    buildPath, false, true,
    "../daysTillGrad-" + version.getVersion() + ".dmg.sha256");
