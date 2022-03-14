import { signIn, useSession } from "next-auth/client";
import { getStripeJs } from "../../services/stripe-js";
import api from "../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface StripeSessionResponseProps {
  data: {
    sessionId: string;
  };
}

export default function SubscribeButton() {
  const [session] = useSession();

  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response: StripeSessionResponseProps = await api.post("subscribe");

      const { data } = response;
      const stripe = getStripeJs();

      (await stripe).redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.SubscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
