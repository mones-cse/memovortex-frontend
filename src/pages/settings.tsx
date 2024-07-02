import { useState } from "react";
import { GeneralSettings } from "../components/settings/GeneralSettings";
import { MainContainer } from "../ui/MainContainer";

const NotificationsSettings = () => {
	return (
		<div>
			<p>Notifications</p>
		</div>
	);
};

const BillingSettings = () => {
	return (
		<div>
			<p>Billing</p>
		</div>
	);
};

const LoginSecuritySettings = () => {
	return (
		<div>
			<p>Login & Security</p>
		</div>
	);
};

const MembersSettings = () => {
	return (
		<div>
			<p>Members</p>
		</div>
	);
};

const UserRolesSettings = () => {
	return (
		<div>
			<p>User Roles</p>
		</div>
	);
};

const SettingsSubNavLinks: {
	[key: string]: {
		label: string;
		key: string;
		componenet: JSX.Element;
	};
} = {
	general: {
		label: "General",
		key: "general",
		componenet: <GeneralSettings />,
	},
	notifications: {
		label: "Notifications",
		key: "notifications",
		componenet: <NotificationsSettings />,
	},
	billing: {
		label: "Billing",
		key: "billing",
		componenet: <BillingSettings />,
	},
	loginAndSecurity: {
		label: "Login & Security",
		key: "loginAndSecurity",
		componenet: <LoginSecuritySettings />,
	},
	members: {
		label: "Members",
		key: "members",
		componenet: <MembersSettings />,
	},
	userRoles: {
		label: "User Roles",
		key: "userRoles",
		componenet: <UserRolesSettings />,
	},
};

const DoubleSidebar = ({
	activeTab,
	setActiveTab,
}: { activeTab: string; setActiveTab: (x: string) => void }) => {
	return (
		<div className="w-[200px] border border-solid border-r-gray-300 p-3 border-t-0 border-l-0">
			<div className="p-2 flex flex-col ">
				{Object.entries(SettingsSubNavLinks).map(([key, value]) => {
					return (
						<button
							type="button"
							key={key}
							className={`flex p-2 hover:bg-slate-100 cursor-pointer rounded-sm ${activeTab === value.key ? "bg-blue-500 bg-opacity-10" : ""}`}
							onClick={() => setActiveTab(value.key)}
						>
							<p
								className={`${activeTab === value.key ? "text-blue-500" : "text-black"}`}
							>
								{value.label}
							</p>
						</button>
					);
				})}
			</div>
		</div>
	);
};

const Settings = () => {
	const [activeTab, setActiveTab] = useState("general");

	return (
		<MainContainer>
			<div className="flex-1 flex bg-white">
				<DoubleSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
				<div className="p-4 flex-1 ">
					{SettingsSubNavLinks[activeTab].componenet}
				</div>
			</div>
		</MainContainer>
	);
};

export default Settings;
