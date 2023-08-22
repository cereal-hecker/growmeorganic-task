import { useState } from "react";
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface SubPoint {
  id: number;
  name: string;
}

interface DepartmentType {
  id: number;
  department: string;
  sub_departments: SubPoint[];
}

const departmentData: DepartmentType[] = [
  {
    id: 1,
    department: "customer_service",
    sub_departments: [
      { id: 11, name: "support" },
      { id: 12, name: "customer_success" },
    ],
  },
  {
    id: 2,
    department: "design",
    sub_departments: [
      { id: 21, name: "graphic_design" },
      { id: 22, name: "product_design" },
      { id: 23, name: "web_design" },
    ],
  },
];

export default function CollapseComponent() {
  const [open, setOpen] = useState<boolean[]>(departmentData.map(() => true));
  const [selected, setSelected] = useState<boolean[]>(
    new Array(
      departmentData.reduce(
        (total, dept) => total + dept.sub_departments.length,
        0
      )
    ).fill(false)
  );

  const handleHeaderToggle = (index: number) => {
    setOpen((prevOpen) => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !updatedOpen[index];
      return updatedOpen;
    });

    setSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      const headerSubpoints = departmentData[index].sub_departments;
      const headerIndex = departmentData
        .slice(0, index)
        .reduce((total, dept) => total + dept.sub_departments.length, 0);
      headerSubpoints.forEach(
        (subpoint) => (updatedSelected[headerIndex + subpoint.id] = true)
      );
      return updatedSelected;
    });
  };

  const handleSubpointToggle = (subpointIndex: number) => {
    setSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[subpointIndex] = !updatedSelected[subpointIndex];
      return updatedSelected;
    });
  };

  return (
    <div>
      <h2>Component 2</h2>
      <List>
        {departmentData.map((department, index) => (
          <div key={department.id}>
            <ListItem>
              <ListItemButton onClick={() => handleHeaderToggle(index)}>
                <ListItemIcon>
                  <Checkbox
                    checked={department.sub_departments.every(
                      (subpoint) => selected[subpoint.id]
                    )}
                  />
                </ListItemIcon>
                <ListItemText primary={department.department} />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.sub_departments.map((subpoint) => (
                  <ListItem key={subpoint.id}>
                    <ListItemButton
                      onClick={() => handleSubpointToggle(subpoint.id)}
                      sx={{ px: 10 }}
                    >
                      <ListItemIcon>
                        <Checkbox checked={selected[subpoint.id]} />
                      </ListItemIcon>
                      <ListItemText primary={subpoint.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
}
