//Version refactored by Ben

import React, { useEffect, useState } from "react";
import "../App.css";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// import FilterListIcon from "@material-ui/icons/FilterList";
import SearchBar from "material-ui-search-bar";

import ImgMediaCard from "./SinglePokemonCard";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// function createData(name, id, type_1, type_2, hp, attack, defense, sp_attack, sp_defense, speed) {
//    return { name, id, hp, type_1, type_2, attack, defense, sp_attack, sp_defense, speed };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    //     id: "name",
    //     numeric: false,
    //     disablePadding: true,
    //     label: "Dessert (100g serving)",
    //   },
    //   { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
    //   { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
    //   { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
    //   { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },

    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "type_1", numeric: false, disablePadding: false, label: "Type 1" },
  { id: "type_2", numeric: false, disablePadding: false, label: "Type 2" },
  { id: "hp", numeric: true, disablePadding: false, label: "HP" },
  { id: "attack", numeric: true, disablePadding: false, label: "Attack" },
  { id: "defense", numeric: true, disablePadding: false, label: "Defense" },
  {
    id: "sp_attack",
    numeric: true,
    disablePadding: false,
    label: "Sp. Attack",
  },
  {
    id: "sp_defense",
    numeric: true,
    disablePadding: false,
    label: "Sp. Defense",
  },
  { id: "speed", numeric: true, disablePadding: false, label: "Speed" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all Pokemons" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"} //previously "none":"normal" and didn't work
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      id="toolbar_style"
    >
      {numSelected > 0 ? (
        numSelected === 1 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
            id="picked_message"
          >
            First Fighter selected. Pick a second fighter
            {/* {numSelected} Pokemon{numSelected > 1 ? "s" : null} selected */}
          </Typography>
        ) : numSelected === 2 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
            id="picked_message"
          >
            Fighters ready. Click the button to start the Fight!
            {/* {numSelected} Pokemon{numSelected > 1 ? "s" : null} selected */}
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
            id="picked_message"
          >
            Please select a maximum of 2 Pokemon Fighters
          </Typography>
        )
      ) : (
        <p
          //   className={classes.title}
          className="table_title"
          //   variant="h6"
          //   component="div"
        >
          Pick your fighters
        </p>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 400, //750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ data }) {
  //   console.log(data);
  //   console.log(typeof data);

  //Build the array with pokemon info to be displayed
  let original_rows =
    // data &&
    data.map((element) => ({
      name: element.name.english,
      id: element.id,
      type_1: element.type.length < 1 ? "None" : element.type[0],
      type_2: element.type.length > 1 ? element.type[1] : "None",
      hp: element.base.HP,
      attack: element.base.Attack,
      defense: element.base.Defense,
      sp_attack: element.base["Sp. Attack"],
      sp_defense: element.base["Sp. Defense"],
      speed: element.base.Speed,
    }));
  //   console.log(rows);

  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Search bar
  const [rows, setRows] = useState(original_rows);
  const [searched, setSearched] = useState("");
  // My logic
  const [fightersChosen, setFightersChosen] = useState([]);
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (selected.length === 2 && !fightersChosen.length) {
      const chosenFighters = selected.map((s) => {
        return original_rows.find((p) => p.name === s);
      });
      setFightersChosen(chosenFighters);
    }
  }, [selected, original_rows, fightersChosen]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  //################################################################

  const handleFight = () => {
    console.log("some game logic");
    const [pk1, pk2] = fightersChosen;
    if (pk1.hp >= pk2.hp) {
      setWinner(pk1);
    } else {
      setWinner(pk2);
    }
  };

  const handleClick = (event, name) => {
    console.log({ event, name });
    console.log({ selected: original_rows.find((p) => p.name === name) });

    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);

    // const original_rows =
    //   // data &&
    //   data.map((element) => ({
    //     name: element.name.english,
    //     id: element.id,
    //     type_1: element.type.length < 1 ? "None" : element.type[0],
    //     type_2: element.type.length > 1 ? element.type[1] : "None",
    //     hp: element.base.HP,
    //     attack: element.base.Attack,
    //     defense: element.base.Defense,
    //     sp_attack: element.base["Sp. Attack"],
    //     sp_defense: element.base["Sp. Defense"],
    //     speed: element.base.Speed,
    //   }));

    // console.log(event.target);
    // console.log(event.target.innerHTML);
    // console.log(event.target.closest('table').firstChild.innerHTML);

    // console.log(typeof selected);
    // const selectedIndex = selected.indexOf(name);
    // // const selectedIndex2 = selected.indexOf();
    // console.log("selectedIndex", selectedIndex);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    // setSelected(newSelected);
    // console.log("I selected these = ", newSelected);

    // console.log('winner=', winner);

    // Find ID of chosen pokemon, not used

    //     var getPokemonId = (pokemon_name, rows) => {

    //         let objectWithId = rows.find(element=> element.name === pokemon_name);
    //         console.log(objectWithId);

    //         console.log(objectWithId);

    //         console.log(pokemon_name);
    //         console.log(typeof pokemon_name);

    //         console.log('here below are rows');
    //         console.log(rows[0]);

    //         // return objectWithId.id;
    //    }
  };

  //####################################################################

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    console.log(rowsPerPage);
    console.log(emptyRows);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  console.log(rows.length);
  //   console.log("HEEEEEERE");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  //const handleCancel = () => (setSelected = []);

  //Search bar

  const requestSearch = (searchedVal) => {
    const filteredRows = original_rows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div>
      <div className={classes.root}>
        {/* {data && data.map(pokemon => <li key={pokemon.id} >{pokemon.name.english}</li>)} */}
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />

          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />

          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>

                        {/* <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell> */}

                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="left">{row.type_1}</TableCell>
                        <TableCell align="left">{row.type_2}</TableCell>
                        <TableCell align="right">{row.hp}</TableCell>
                        <TableCell align="right">{row.attack}</TableCell>
                        <TableCell align="right">{row.defense}</TableCell>
                        <TableCell align="right">{row.sp_attack}</TableCell>
                        <TableCell align="right">{row.sp_defense}</TableCell>
                        <TableCell align="right">{row.speed}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage} //before onPageChange but now deprecated
            onChangeRowsPerPage={handleChangeRowsPerPage} //before onRowsPerPageChange but now deprecated
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          className="paddingLabel"
        />
      </div>

      {fightersChosen.length && (
        <>
          <div className="cardsArea">
            <ImgMediaCard
              className="imageFighter1"
              pokepic_id={fightersChosen[0].id}
            />
            <div>
              <p className="vs_text">VS</p>
            </div>
            <ImgMediaCard
              className="imageFighter2"
              pokepic_id={fightersChosen[1].id}
            />
          </div>
          {/* <img src={homeImage} className="homeImage" alt="Home"></img>  */}

          <div className="fightersTags">
            <div className="fighterLeftTag">
              <span className="lower_text_left">{fightersChosen[0].name}</span>
            </div>
            <div className="tagFiller"></div>
            <div className="fighterRightTag">
              <span className="lower_text_right">{fightersChosen[1].name}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <p className="vs_text" onClick={handleFight}>
              Fight
            </p>
          </div>
        </>
      )}
      {winner && <p className="vs_text">And the winner is... {winner.name}</p>}
    </div>
  );
}
