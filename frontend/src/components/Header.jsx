import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Switch } from '@nextui-org/switch';
import { PiSunDimFill, PiMoonFill } from "react-icons/pi";


function Header({ darkMode }) {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit text-2xl">Fresher Park Jobs</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            defaultSelected
            size="lg"
            color="secondary"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <PiSunDimFill className={className} />
              ) : (
                <PiMoonFill className={className} />
              )
            }
            isSelected={darkMode.value}
            onValueChange={
              darkMode.toggle
            }
          >
          </Switch>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  )
}

export default Header