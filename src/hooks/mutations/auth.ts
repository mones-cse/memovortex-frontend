import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth";
import type { TChangePassword } from "../../types/auth.type";

export const useChangePasswordMutation = () => {
	return useMutation({
		mutationFn: (data: TChangePassword) => changePassword(data),
		onSuccess: () => {
			console.log("Password changed successfully");
		},
		onError: (error) => {
			console.error("Failed to change password:", error);
		},
	});
};

// import { useMutation } from '@tanstack/react-query';
// import { changePassword } from '../api/auth';
// import { TChangePassword } from '../types'; // Assuming you have this type defined

// export const useChangePasswordMutation = () => {
//   return useMutation({
//     mutationFn: (data: TChangePassword) => changePassword(data),
//     onSuccess: () => {
//       // Handle success (e.g., show a success message)
//       console.log('Password changed successfully');
//     },
//     onError: (error) => {
//       // Handle error (e.g., show an error message)
//       console.error('Failed to change password:', error);
//     },
//   });
