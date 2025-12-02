import ssl
import socket
import datetime

def get_ssl_certificate_info(hostname, port=443):
    try:
        context = ssl.create_default_context()
        with socket.create_connection((hostname, port)) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                
                # Extracting specific information
                subject = dict(x[0] for x in cert['subject'])
                issuer = dict(x[0] for x in cert['issuer'])
                not_before = datetime.datetime.strptime(cert['notBefore'], '%b %d %H:%M:%S %Y %Z')
                not_after = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                
                print(f"Certificate for: {hostname}")
                print(f"Common Name (Subject): {subject.get('commonName')}")
                print(f"Organization (Subject): {subject.get('organizationName')}")
                print(f"Common Name (Issuer): {issuer.get('commonName')}")
                print(f"Valid From: {not_before}")
                print(f"Valid Until: {not_after}")
                
                if datetime.datetime.now() > not_after:
                    print("Status: EXPIRED")
                elif (not_after - datetime.datetime.now()).days < 30: # Example: Warn if less than 30 days
                    print(f"Status: WARNING - Expires in {(not_after - datetime.datetime.now()).days} days")
                else:
                    print("Status: OK")

    except ssl.SSLError as e:
        print(f"SSL Error for {hostname}: {e}")
    except socket.gaierror:
        print(f"Could not resolve hostname: {hostname}")
    except Exception as e:
        print(f"An unexpected error occurred for {hostname}: {e}")

# Example usage
get_ssl_certificate_info("www.google.com")
get_ssl_certificate_info("expired.badssl.com") # Example of an expired certificate