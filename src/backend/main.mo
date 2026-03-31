import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Email = Text;
  type Timestamp = Int;

  type WaitlistEntry = {
    email : Email;
    timestamp : Timestamp;
  };

  module WaitlistEntry {
    public func compare(entry1 : WaitlistEntry, entry2 : WaitlistEntry) : Order.Order {
      if (entry1.timestamp < entry2.timestamp) {
        #less;
      } else if (entry1.timestamp > entry2.timestamp) {
        #greater;
      } else {
        Text.compare(entry1.email, entry2.email);
      };
    };
  };

  let waitlist = Map.empty<Email, WaitlistEntry>();

  public shared ({ caller }) func addToWaitlist(email : Email) : async () {
    let newEntry : WaitlistEntry = {
      email;
      timestamp = Time.now();
    };

    if (waitlist.containsKey(email)) {
      Runtime.trap("This email is already on the waitlist!");
    };
    waitlist.add(email, newEntry);
  };

  public query ({ caller }) func getTotalWaitlistEntries() : async Nat {
    waitlist.size();
  };

  public query ({ caller }) func getAllWaitlistEntriesSorted() : async [WaitlistEntry] {
    waitlist.values().toArray().sort();
  };
};
