import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "../features/company/companySlice"; // adjust path
import { COMPANY_API_END_POINT } from "../utils/Host";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.singleCompany);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return;

    const fetchCompany = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true, // if you need cookies/auth
        });

        if (res.data && res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          setError("Company not found");
          dispatch(setSingleCompany(null)); // clear previous company
        }
      } catch (err) {
        console.error("Error fetching company:", err);
        setError(err.response?.data?.message || "Failed to fetch company");
        dispatch(setSingleCompany(null)); // clear previous company
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId, dispatch]);

  return { company, loading, error };
};

export default useGetCompanyById;
