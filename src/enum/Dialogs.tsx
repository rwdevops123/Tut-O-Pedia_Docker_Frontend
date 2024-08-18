import Icons from "./Icons";

const DialogIds = {
  Connecting: "CONNECT",
  LoadEmpty: "LOADING",
  NotFound: "FIND",
  Duplicate: "DUPLICATE",
};

const dialogInfo = [
  {
    id: DialogIds.LoadEmpty,
    title: "Load Problem. No Tutorials Retrieved",
    message: "Is Server Running?",
    icon: Icons.Server,
  },
  {
    id: DialogIds.NotFound,
    title: "Not Found",
    message: "Tutorial Not Found",
    icon: Icons.NotFound,
  },
  {
    id: DialogIds.Duplicate,
    title: "Duplicate",
    message: "A tutorial with the same name already exits",
    icon: Icons.Duplicate,
  },
  {
    id: DialogIds.Connecting,
    title: "Checking Server",
    message: "Checking Connection To Server",
    icon: Icons.Duplicate,
  },
];

export { dialogInfo, DialogIds };
