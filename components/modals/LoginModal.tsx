import React, { ChangeEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import { Input } from "../Input";
import { Modal } from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";

export const LoginModal = () => {
  const loginModal = useLoginModal();
  const register = useRegisterModal();

  const [form, setForm] = useState({
    email: "dog@gmail.com",
    password: "123321",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email: form.email,
        password: form.password,
      });

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = () => {
    if (isLoading) return;

    loginModal.onClose();
    register.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        disabled={isLoading}
        required
      />

      <Input
        id="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
        disabled={isLoading}
        type="password"
        required
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using SM App?
        <button
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline ml-1"
        >
          Create an account
        </button>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
