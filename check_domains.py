#!/usr/bin/env python3
"""
Domain availability checker for .ro domains
Queries whois.rotld.ro for each domain in domain_ideas.txt
"""

import socket
import time
from datetime import datetime

def whois_query(domain, whois_server="whois.rotld.ro", port=43):
    """
    Perform WHOIS query for a domain

    Args:
        domain: Domain name to check
        whois_server: WHOIS server to query
        port: WHOIS server port (default 43)

    Returns:
        str: WHOIS response text
    """
    try:
        # Create socket connection
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(10)
        s.connect((whois_server, port))

        # Send domain query
        s.send(f"{domain}\r\n".encode())

        # Receive response
        response = b""
        while True:
            data = s.recv(4096)
            if not data:
                break
            response += data

        s.close()
        return response.decode('utf-8', errors='ignore')

    except Exception as e:
        return f"ERROR: {str(e)}"

def extract_whois_info(whois_response):
    """
    Extract registrar and registration date from WHOIS response

    Args:
        whois_response: WHOIS query response text

    Returns:
        dict: Dictionary with registrar and registration_date
    """
    info = {
        'registrar': 'N/A',
        'registration_date': 'N/A'
    }

    lines = whois_response.split('\n')
    for line in lines:
        line_lower = line.lower().strip()

        # Extract registrar
        if line_lower.startswith('registrar:'):
            info['registrar'] = line.split(':', 1)[1].strip()

        # Extract registration date (various formats)
        if line_lower.startswith('registered on:') or line_lower.startswith('registration date:'):
            info['registration_date'] = line.split(':', 1)[1].strip()

    return info

def is_domain_available(whois_response):
    """
    Check if domain is available based on WHOIS response

    Args:
        whois_response: WHOIS query response text

    Returns:
        bool: True if available, False if registered
    """
    # Common indicators that domain is NOT registered
    not_registered_indicators = [
        "No entries found",
        "NOT FOUND",
        "No Data Found",
        "not found",
        "no entries found",
        "% No entries found for the selected source"
    ]

    # Check for availability indicators
    response_lower = whois_response.lower()
    for indicator in not_registered_indicators:
        if indicator.lower() in response_lower:
            return True

    # If we find domain registration info, it's taken
    if "domain name:" in response_lower or "registered on:" in response_lower:
        return False

    # If ERROR, mark as unknown
    if "ERROR:" in whois_response:
        return None

    return False

def check_domains_from_file(filename="domain_ideas.txt"):
    """
    Read domains from file and check availability

    Args:
        filename: Path to file containing domain list

    Returns:
        list: List of tuples (domain, status, registrar, registration_date)
    """
    results = []
    checked_domains = set()  # Track checked domains to avoid duplicates

    try:
        with open(filename, 'r') as f:
            domains = [line.strip() for line in f if line.strip()]

        # Remove duplicates (case-insensitive) while preserving order
        unique_domains = []
        seen = set()
        for domain in domains:
            domain_lower = domain.lower()
            if domain_lower not in seen:
                seen.add(domain_lower)
                unique_domains.append(domain)

        duplicates_removed = len(domains) - len(unique_domains)
        if duplicates_removed > 0:
            print(f"Removed {duplicates_removed} duplicate(s)\n")

        print(f"Found {len(unique_domains)} unique domains to check\n")

        for i, domain in enumerate(unique_domains, 1):
            print(f"[{i}/{len(unique_domains)}] Checking {domain}...", end=" ")

            # Query WHOIS
            response = whois_query(domain)
            availability = is_domain_available(response)

            # Extract WHOIS info
            whois_info = extract_whois_info(response)

            if availability is True:
                status = "✅ AVAILABLE"
                print(status)
            elif availability is False:
                status = "❌ REGISTERED"
                print(status)
            else:
                status = "⚠️  UNKNOWN/ERROR"
                print(status)

            results.append((
                domain,
                status,
                whois_info['registrar'],
                whois_info['registration_date']
            ))

            # Be nice to the WHOIS server - delay between queries
            if i < len(unique_domains):
                time.sleep(2)  # 2 second delay between queries

        return results

    except FileNotFoundError:
        print(f"ERROR: File '{filename}' not found")
        return []
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return []

def save_results(results, output_file=None):
    """
    Save results to timestamped file

    Args:
        results: List of tuples (domain, status, registrar, registration_date)
        output_file: Optional output filename
    """
    if output_file is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = f"domain_check_results_{timestamp}.txt"

    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            # Write header
            f.write("="*100 + "\n")
            f.write("DOMAIN AVAILABILITY CHECK RESULTS\n")
            f.write(f"Checked: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Total domains checked: {len(results)}\n")
            f.write("="*100 + "\n\n")

            # Count available domains
            available = sum(1 for _, status, _, _ in results if "AVAILABLE" in status)
            registered = sum(1 for _, status, _, _ in results if "REGISTERED" in status)
            unknown = sum(1 for _, status, _, _ in results if "UNKNOWN" in status)

            f.write("SUMMARY:\n")
            f.write(f"  ✅ Available: {available}\n")
            f.write(f"  ❌ Registered: {registered}\n")
            f.write(f"  ⚠️  Unknown/Error: {unknown}\n")
            f.write("\n" + "="*100 + "\n\n")

            # Sort results: Available first, then Registered, then Unknown
            sorted_results = sorted(results, key=lambda x: (
                0 if "AVAILABLE" in x[1] else 1 if "REGISTERED" in x[1] else 2,
                x[0].lower()  # Secondary sort by domain name
            ))

            # Write table header
            f.write(f"{'Domain':<35} {'Registrar':<30} {'Registration Date':<20}\n")
            f.write("-"*100 + "\n")

            # Write detailed results in table format
            for domain, status, registrar, registration_date in sorted_results:
                # Add emoji at the end of domain name
                if "AVAILABLE" in status:
                    domain_with_emoji = f"{domain} ✅"
                elif "REGISTERED" in status:
                    domain_with_emoji = f"{domain} ❌"
                else:
                    domain_with_emoji = f"{domain} ⚠️"

                f.write(f"{domain_with_emoji:<35} {registrar:<30} {registration_date:<20}\n")

            f.write("="*100 + "\n")

        print(f"\n✅ Results saved to: {output_file}")
        print(f"\nSummary: {available} available, {registered} registered, {unknown} unknown/error")

    except Exception as e:
        print(f"ERROR saving results: {str(e)}")

def main():
    """Main execution function"""
    import sys

    print("="*80)
    print("RO DOMAIN AVAILABILITY CHECKER")
    print("="*80)
    print()

    # Check if filename provided as argument
    filename = sys.argv[1] if len(sys.argv) > 1 else "domain_ideas.txt"

    print(f"Reading from: {filename}\n")

    # Check domains
    results = check_domains_from_file(filename)

    if results:
        # Save results
        save_results(results)
    else:
        print("\nNo results to save")

if __name__ == "__main__":
    main()
