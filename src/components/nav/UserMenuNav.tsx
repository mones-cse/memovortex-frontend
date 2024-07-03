import { ActionIcon, AppShell, Avatar, Menu } from "@mantine/core";
import { CiLogout, CiSettings } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const UserMenuNav = () => {
	const { logout, user } = useAuth();
	return (
		<AppShell.Section>
			<div className="flex items-center justify-between">
				<div>
					<Avatar name={user?.full_name} color="initials" />
				</div>
				<div>
					<p className="text-sm font-bold">{user?.full_name}</p>
					<p className="text-xs text-slate-500">{user?.email}</p>
				</div>
				<Menu>
					<Menu.Target>
						<ActionIcon
							radius={100}
							size="auto"
							color="indigo"
							variant="outline"
						>
							<MdKeyboardArrowRight />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Options</Menu.Label>
						<RouterNavLink to="/settings">
							<Menu.Item leftSection={<CiSettings />}>Settings</Menu.Item>
						</RouterNavLink>

						<Menu.Item leftSection={<CiLogout />} onClick={logout}>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		</AppShell.Section>
	);
};
