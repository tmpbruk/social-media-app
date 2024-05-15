import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { id } from "date-fns/locale";

const formFields: Record<string, string>[] = [
  {
    id: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: "name",
    type: "name",
    placeholder: "Name",
  },
  {
    id: "username",
    type: "username",
    placeholder: "Username",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
  },
];

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [form, setForm] = useState(
    formFields.reduce((acc, field) => {
      return {
        ...acc,
        [field.id]: "",
      };
    }, {})
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email: form.email,
        password: form.password,
        name: form.name,
        username: form.username,
      });

      toast.success("Account created");

      signIn("credentials", {
        email: form.email,
        password: form.password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = () => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {formFields.map(({ id, type, placeholder }) => (
        <Input
          key={id}
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={form[id]}
          disabled={isLoading}
          required
        />
      ))}
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <button
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline ml-1"
        >
          Sign in
        </button>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
